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
exports.BillingService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let BillingService = class BillingService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createInvoice(orderId, data) {
        const orders = await this.prisma.sql('SELECT * FROM "SalesOrder" WHERE "id" = $1 LIMIT 1', [orderId]);
        const order = orders[0];
        if (!order) {
            throw new common_1.NotFoundException('Sales order not found');
        }
        const lines = await this.prisma.sql('SELECT * FROM "SalesOrderLine" WHERE "orderId" = $1', [orderId]);
        const invoiceId = globalThis.crypto
            ? globalThis.crypto.randomUUID()
            : require('crypto').randomUUID();
        const dueDate = data.dueDate ? new Date(data.dueDate).toISOString() : null;
        await this.prisma.sql('INSERT INTO "Invoice" ("id", "invoiceNumber", "orderId", "storeId", "status", "totalAmount", "taxAmount", "discountAmount", "netAmount", "dueDate") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)', [
            invoiceId,
            data.invoiceNumber,
            order.id,
            order.storeId,
            'UNPAID',
            order.totalAmount,
            order.taxAmount,
            order.discountAmount,
            order.netAmount,
            dueDate,
        ]);
        for (const line of lines) {
            const lineId = globalThis.crypto
                ? globalThis.crypto.randomUUID()
                : require('crypto').randomUUID();
            await this.prisma.sql('INSERT INTO "InvoiceLine" ("id", "invoiceId", "skuId", "quantity", "unitPrice", "discountAmount", "taxRate", "taxAmount", "netAmount") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)', [
                lineId,
                invoiceId,
                line.skuId,
                line.quantity,
                line.unitPrice,
                line.discountAmount,
                line.taxRate,
                line.taxAmount,
                line.netAmount,
            ]);
        }
        const invoiceRows = await this.prisma.sql('SELECT * FROM "Invoice" WHERE "id" = $1 LIMIT 1', [invoiceId]);
        const invoice = invoiceRows[0];
        invoice.lines = await this.prisma.sql('SELECT * FROM "InvoiceLine" WHERE "invoiceId" = $1', [invoiceId]);
        return invoice;
    }
    async getInvoice(invoiceId) {
        const invoices = await this.prisma.sql('SELECT * FROM "Invoice" WHERE "id" = $1 LIMIT 1', [invoiceId]);
        if (invoices.length === 0)
            return null;
        const invoice = invoices[0];
        invoice.lines = await this.prisma.sql('SELECT * FROM "InvoiceLine" WHERE "invoiceId" = $1', [invoiceId]);
        invoice.payments = await this.prisma.sql('SELECT * FROM "Payment" WHERE "invoiceId" = $1', [invoiceId]);
        return invoice;
    }
    async getInvoices(storeId) {
        const invoices = await this.prisma.sql('SELECT * FROM "Invoice" WHERE "storeId" = $1', [storeId]);
        for (const inv of invoices) {
            inv.lines = await this.prisma.sql('SELECT * FROM "InvoiceLine" WHERE "invoiceId" = $1', [inv.id]);
        }
        return invoices;
    }
};
exports.BillingService = BillingService;
exports.BillingService = BillingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BillingService);
//# sourceMappingURL=billing.service.js.map