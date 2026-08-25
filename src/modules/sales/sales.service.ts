import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { InventoryService } from '../inventory/inventory.service';

@Injectable()
export class SalesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly inventoryService: InventoryService,
  ) {}

  async createSalesOrder(data: {
    orderNumber: string;
    storeId: string;
    customerId?: string;
    lines: Array<{
      skuId: string;
      batchId?: string;
      quantity: number;
      unitPrice: number;
      discountAmount?: number;
      taxRate?: number;
    }>;
  }) {
    let totalAmount = 0;
    let totalTaxAmount = 0;
    let totalDiscountAmount = 0;

    const orderId = globalThis.crypto
      ? globalThis.crypto.randomUUID()
      : require('crypto').randomUUID();
    const lineItemsData: Array<{
      skuId: string;
      batchId: string | null;
      quantity: number;
      unitPrice: number;
      discountAmount: number;
      taxRate: number;
      taxAmount: number;
      netAmount: number;
    }> = [];

    for (const line of data.lines) {
      const discount = line.discountAmount || 0;
      const lineTaxRate = line.taxRate || 0;

      const taxableAmount = line.quantity * line.unitPrice - discount;
      const taxAmount = taxableAmount * (lineTaxRate / 100);
      const netAmount = taxableAmount + taxAmount;

      totalAmount += line.quantity * line.unitPrice;
      totalDiscountAmount += discount;
      totalTaxAmount += taxAmount;

      lineItemsData.push({
        skuId: line.skuId,
        batchId: line.batchId || null,
        quantity: line.quantity,
        unitPrice: line.unitPrice,
        discountAmount: discount,
        taxRate: lineTaxRate,
        taxAmount,
        netAmount,
      });

      // Trigger stock deduction
      await this.inventoryService.adjustStock('SYSTEM', 'ORG_DEFAULT', {
        storeId: data.storeId,
        skuId: line.skuId,
        batchId: line.batchId,
        movementType: 'SALE',
        quantity: line.quantity,
        unitCost: line.unitPrice,
        referenceType: 'SALES_ORDER',
        referenceId: orderId,
        direction: 'OUT',
      });
    }

    const netAmount = totalAmount - totalDiscountAmount + totalTaxAmount;

    await this.prisma.sql(
      'INSERT INTO "SalesOrder" ("id", "orderNumber", "storeId", "customerId", "status", "totalAmount", "taxAmount", "discountAmount", "netAmount") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
      [
        orderId,
        data.orderNumber,
        data.storeId,
        data.customerId || null,
        'COMPLETED',
        totalAmount,
        totalTaxAmount,
        totalDiscountAmount,
        netAmount,
      ],
    );

    for (const item of lineItemsData) {
      const lineId = globalThis.crypto
        ? globalThis.crypto.randomUUID()
        : require('crypto').randomUUID();
      await this.prisma.sql(
        'INSERT INTO "SalesOrderLine" ("id", "orderId", "skuId", "batchId", "quantity", "unitPrice", "discountAmount", "taxRate", "taxAmount", "netAmount") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)',
        [
          lineId,
          orderId,
          item.skuId,
          item.batchId,
          item.quantity,
          item.unitPrice,
          item.discountAmount,
          item.taxRate,
          item.taxAmount,
          item.netAmount,
        ],
      );
    }

    const orderRows = await this.prisma.sql(
      'SELECT * FROM "SalesOrder" WHERE "id" = $1 LIMIT 1',
      [orderId],
    );
    const order = orderRows[0];
    order.lines = await this.prisma.sql(
      'SELECT * FROM "SalesOrderLine" WHERE "orderId" = $1',
      [orderId],
    );
    return order;
  }

  async getSalesOrders(storeId: string) {
    const orders = await this.prisma.sql(
      'SELECT * FROM "SalesOrder" WHERE "storeId" = $1',
      [storeId],
    );
    for (const order of orders) {
      order.lines = await this.prisma.sql(
        'SELECT * FROM "SalesOrderLine" WHERE "orderId" = $1',
        [order.id],
      );
    }
    return orders;
  }
}
