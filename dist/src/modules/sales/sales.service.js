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
exports.SalesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const inventory_service_1 = require("../inventory/inventory.service");
let SalesService = class SalesService {
    constructor(prisma, inventoryService) {
        this.prisma = prisma;
        this.inventoryService = inventoryService;
    }
    async createSalesOrder(data) {
        let totalAmount = 0;
        let totalTaxAmount = 0;
        let totalDiscountAmount = 0;
        const orderId = globalThis.crypto ? globalThis.crypto.randomUUID() : require('crypto').randomUUID();
        const lineItemsData = [];
        for (const line of data.lines) {
            const discount = line.discountAmount || 0;
            const lineTaxRate = line.taxRate || 0;
            const taxableAmount = (line.quantity * line.unitPrice) - discount;
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
        await this.prisma.sql('INSERT INTO "SalesOrder" ("id", "orderNumber", "storeId", "customerId", "status", "totalAmount", "taxAmount", "discountAmount", "netAmount") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)', [orderId, data.orderNumber, data.storeId, data.customerId || null, 'COMPLETED', totalAmount, totalTaxAmount, totalDiscountAmount, netAmount]);
        for (const item of lineItemsData) {
            const lineId = globalThis.crypto ? globalThis.crypto.randomUUID() : require('crypto').randomUUID();
            await this.prisma.sql('INSERT INTO "SalesOrderLine" ("id", "orderId", "skuId", "batchId", "quantity", "unitPrice", "discountAmount", "taxRate", "taxAmount", "netAmount") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)', [lineId, orderId, item.skuId, item.batchId, item.quantity, item.unitPrice, item.discountAmount, item.taxRate, item.taxAmount, item.netAmount]);
        }
        const orderRows = await this.prisma.sql('SELECT * FROM "SalesOrder" WHERE "id" = $1 LIMIT 1', [orderId]);
        const order = orderRows[0];
        order.lines = await this.prisma.sql('SELECT * FROM "SalesOrderLine" WHERE "orderId" = $1', [orderId]);
        return order;
    }
    async getSalesOrders(storeId) {
        const orders = await this.prisma.sql('SELECT * FROM "SalesOrder" WHERE "storeId" = $1', [storeId]);
        for (const order of orders) {
            order.lines = await this.prisma.sql('SELECT * FROM "SalesOrderLine" WHERE "orderId" = $1', [order.id]);
        }
        return orders;
    }
};
exports.SalesService = SalesService;
exports.SalesService = SalesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        inventory_service_1.InventoryService])
], SalesService);
//# sourceMappingURL=sales.service.js.map