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
exports.InventoryService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let InventoryService = class InventoryService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getStockBalances(storeId) {
        const balances = await this.prisma.sql('SELECT * FROM "StockBalance" WHERE "storeId" = $1', [storeId]);
        for (const bal of balances) {
            const skus = await this.prisma.sql('SELECT * FROM "Sku" WHERE "id" = $1 LIMIT 1', [bal.skuId]);
            bal.sku = skus[0] || null;
        }
        return balances;
    }
    async getStockLedger(storeId) {
        const ledger = await this.prisma.sql('SELECT * FROM "StockLedger" WHERE "storeId" = $1 ORDER BY "occurredAt" DESC', [storeId]);
        for (const entry of ledger) {
            const skus = await this.prisma.sql('SELECT * FROM "Sku" WHERE "id" = $1 LIMIT 1', [entry.skuId]);
            entry.sku = skus[0] || null;
        }
        return ledger;
    }
    async adjustStock(userId, organizationId, data, txClient) {
        const client = txClient || this.prisma;
        const balances = await client.sql('SELECT * FROM "StockBalance" WHERE "storeId" = $1 AND "skuId" = $2 LIMIT 1', [data.storeId, data.skuId]);
        let balance = balances.length > 0 ? balances[0] : null;
        const movementQty = data.quantity;
        if (!balance) {
            if (data.direction === 'OUT') {
                throw new common_1.BadRequestException('Cannot reduce stock. Current balance is 0.');
            }
            const newId = globalThis.crypto
                ? globalThis.crypto.randomUUID()
                : require('crypto').randomUUID();
            const insertRows = await client.sql('INSERT INTO "StockBalance" ("id", "storeId", "skuId", "batchId", "onHandQty", "availableQty", "averageCost", "updatedAt") VALUES ($1, $2, $3, $4, $5, $6, $7, CURRENT_TIMESTAMP) RETURNING *', [
                newId,
                data.storeId,
                data.skuId,
                data.batchId || null,
                movementQty,
                movementQty,
                data.unitCost,
            ]);
            balance = insertRows[0];
        }
        else {
            const newOnHand = balance.onHandQty +
                (data.direction === 'IN' ? movementQty : -movementQty);
            const newAvailable = balance.availableQty +
                (data.direction === 'IN' ? movementQty : -movementQty);
            if (newAvailable < 0) {
                throw new common_1.BadRequestException(`Negative stock is not allowed. Available: ${balance.availableQty}, request: ${movementQty}`);
            }
            const updateRows = await client.sql('UPDATE "StockBalance" SET "onHandQty" = $1, "availableQty" = $2, "version" = "version" + 1, "updatedAt" = CURRENT_TIMESTAMP WHERE "id" = $3 RETURNING *', [newOnHand, newAvailable, balance.id]);
            balance = updateRows[0];
        }
        const ledgerId = globalThis.crypto
            ? globalThis.crypto.randomUUID()
            : require('crypto').randomUUID();
        const ledgerRows = await client.sql('INSERT INTO "StockLedger" ("id", "organizationId", "storeId", "skuId", "batchId", "movementType", "quantity", "unitCost", "referenceType", "referenceId", "direction", "createdBy", "auditedBy", "approvedBy", "metadata", "shrinkageType") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) RETURNING *', [
            ledgerId,
            organizationId,
            data.storeId,
            data.skuId,
            data.batchId || null,
            data.movementType,
            movementQty,
            data.unitCost,
            data.referenceType,
            data.referenceId,
            data.direction,
            userId,
            data.auditedBy || null,
            data.approvedBy || null,
            data.metadata || null,
            data.movementType,
        ]);
        return { balance, ledger: ledgerRows[0] };
    }
    async createBatch(data) {
        const id = globalThis.crypto
            ? globalThis.crypto.randomUUID()
            : require('crypto').randomUUID();
        const mfgDate = data.manufacturingDate
            ? new Date(data.manufacturingDate).toISOString()
            : null;
        const expDate = data.expiryDate
            ? new Date(data.expiryDate).toISOString()
            : null;
        const rows = await this.prisma.sql('INSERT INTO "Batch" ("id", "skuId", "batchNumber", "manufacturingDate", "expiryDate", "storeId", "vendorId", "quantity", "unitCost", "stockValue") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *', [
            id,
            data.skuId,
            data.batchNumber,
            mfgDate,
            expDate,
            data.storeId,
            data.vendorId,
            data.quantity,
            data.unitCost,
            data.quantity * data.unitCost,
        ]);
        return rows[0];
    }
    async getBatches(storeId) {
        const batches = await this.prisma.sql('SELECT * FROM "Batch" WHERE "storeId" = $1', [storeId]);
        for (const b of batches) {
            const skus = await this.prisma.sql('SELECT * FROM "Sku" WHERE "id" = $1 LIMIT 1', [b.skuId]);
            b.sku = skus[0] || null;
        }
        return batches;
    }
};
exports.InventoryService = InventoryService;
exports.InventoryService = InventoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], InventoryService);
//# sourceMappingURL=inventory.service.js.map