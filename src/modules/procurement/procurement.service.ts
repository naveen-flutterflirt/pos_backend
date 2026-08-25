import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { InventoryService } from '../inventory/inventory.service';

@Injectable()
export class ProcurementService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly inventoryService: InventoryService,
  ) {}

  async createGrn(data: {
    grnNumber: string;
    purchaseOrderId?: string;
    vendorId: string;
    storeId: string;
    description?: string;
    lines: Array<{
      skuId: string;
      orderedQty: number;
      receivedQty: number;
      rejectedQty?: number;
      unitCost: number;
      taxAmount?: number;
      batchNumber?: string;
      manufacturingDate?: Date;
      expiryDate?: Date;
    }>;
  }) {
    const grnId = globalThis.crypto
      ? globalThis.crypto.randomUUID()
      : require('crypto').randomUUID();

    await this.prisma.sql(
      'INSERT INTO "GoodsReceiptNote" ("id", "grnNumber", "purchaseOrderId", "vendorId", "storeId", "description", "status") VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [
        grnId,
        data.grnNumber,
        data.purchaseOrderId || null,
        data.vendorId,
        data.storeId,
        data.description || null,
        'COMPLETED',
      ],
    );

    for (const line of data.lines) {
      let batchId: string | null = null;

      if (line.batchNumber) {
        const bid = globalThis.crypto
          ? globalThis.crypto.randomUUID()
          : require('crypto').randomUUID();
        const mfg = line.manufacturingDate
          ? new Date(line.manufacturingDate).toISOString()
          : null;
        const exp = line.expiryDate
          ? new Date(line.expiryDate).toISOString()
          : null;

        const batchRows = await this.prisma.sql(
          'INSERT INTO "Batch" ("id", "skuId", "batchNumber", "manufacturingDate", "expiryDate", "storeId", "vendorId", "quantity", "unitCost", "stockValue") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
          [
            bid,
            line.skuId,
            line.batchNumber,
            mfg,
            exp,
            data.storeId,
            data.vendorId,
            line.receivedQty,
            line.unitCost,
            line.receivedQty * line.unitCost,
          ],
        );
        batchId = bid;
      }

      const lid = globalThis.crypto
        ? globalThis.crypto.randomUUID()
        : require('crypto').randomUUID();
      await this.prisma.sql(
        'INSERT INTO "GoodsReceiptLine" ("id", "grnId", "skuId", "batchId", "orderedQty", "receivedQty", "rejectedQty", "unitCost", "taxAmount") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
        [
          lid,
          grnId,
          line.skuId,
          batchId,
          line.orderedQty,
          line.receivedQty,
          line.rejectedQty || 0,
          line.unitCost,
          line.taxAmount || 0,
        ],
      );

      // Trigger inventory stock update
      await this.inventoryService.adjustStock('SYSTEM', 'ORG_DEFAULT', {
        storeId: data.storeId,
        skuId: line.skuId,
        batchId: batchId || undefined,
        movementType: 'GRN_RECEIPT',
        quantity: line.receivedQty,
        unitCost: line.unitCost,
        referenceType: 'GRN',
        referenceId: grnId,
        direction: 'IN',
      });
    }

    const grnRows = await this.prisma.sql(
      'SELECT * FROM "GoodsReceiptNote" WHERE "id" = $1 LIMIT 1',
      [grnId],
    );
    const grn = grnRows[0];
    grn.lines = await this.prisma.sql(
      'SELECT * FROM "GoodsReceiptLine" WHERE "grnId" = $1',
      [grnId],
    );
    return grn;
  }

  async getGrns(storeId: string) {
    const grns = await this.prisma.sql(
      'SELECT * FROM "GoodsReceiptNote" WHERE "storeId" = $1',
      [storeId],
    );
    for (const grn of grns) {
      grn.lines = await this.prisma.sql(
        'SELECT * FROM "GoodsReceiptLine" WHERE "grnId" = $1',
        [grn.id],
      );
    }
    return grns;
  }
}
