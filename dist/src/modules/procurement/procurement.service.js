"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcurementService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const inventory_service_1 = require("../inventory/inventory.service");
let ProcurementService = class ProcurementService {
    constructor(prisma, inventoryService) {
        this.prisma = prisma;
        this.inventoryService = inventoryService;
    }
    async createGrn(data) {
        const grnId = globalThis.crypto
            ? globalThis.crypto.randomUUID()
            : require('crypto').randomUUID();
        await this.prisma.sql('INSERT INTO "GoodsReceiptNote" ("id", "grnNumber", "purchaseOrderId", "vendorId", "storeId", "description", "status") VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [
            grnId,
            data.grnNumber,
            data.purchaseOrderId || null,
            data.vendorId,
            data.storeId,
            data.description || null,
            'COMPLETED',
        ]);
        for (const line of data.lines) {
            let batchId = null;
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
                const batchRows = await this.prisma.sql('INSERT INTO "Batch" ("id", "skuId", "batchNumber", "manufacturingDate", "expiryDate", "storeId", "vendorId", "quantity", "unitCost", "stockValue") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *', [
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
                ]);
                batchId = bid;
            }
            const lid = globalThis.crypto
                ? globalThis.crypto.randomUUID()
                : require('crypto').randomUUID();
            await this.prisma.sql('INSERT INTO "GoodsReceiptLine" ("id", "grnId", "skuId", "batchId", "orderedQty", "receivedQty", "rejectedQty", "unitCost", "taxAmount") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)', [
                lid,
                grnId,
                line.skuId,
                batchId,
                line.orderedQty,
                line.receivedQty,
                line.rejectedQty || 0,
                line.unitCost,
                line.taxAmount || 0,
            ]);
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
        const grnRows = await this.prisma.sql('SELECT * FROM "GoodsReceiptNote" WHERE "id" = $1 LIMIT 1', [grnId]);
        const grn = grnRows[0];
        grn.lines = await this.prisma.sql('SELECT * FROM "GoodsReceiptLine" WHERE "grnId" = $1', [grnId]);
        return grn;
    }
    async getGrns(storeId) {
        const grns = await this.prisma.sql('SELECT * FROM "GoodsReceiptNote" WHERE "storeId" = $1', [storeId]);
        for (const grn of grns) {
            grn.lines = await this.prisma.sql('SELECT * FROM "GoodsReceiptLine" WHERE "grnId" = $1', [grn.id]);
        }
        return grns;
    }
};
exports.ProcurementService = ProcurementService;
exports.ProcurementService = ProcurementService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        inventory_service_1.InventoryService])
], ProcurementService);
//# sourceMappingURL=procurement.service.js.map