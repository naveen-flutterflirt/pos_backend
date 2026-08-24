import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BillingService {
  constructor(private readonly prisma: PrismaService) {}

  async createInvoice(orderId: string, data: { invoiceNumber: string; dueDate?: Date }) {
    const orders = await this.prisma.sql('SELECT * FROM "SalesOrder" WHERE "id" = $1 LIMIT 1', [orderId]);
    const order = orders[0];

    if (!order) {
      throw new NotFoundException('Sales order not found');
    }

    const lines = await this.prisma.sql('SELECT * FROM "SalesOrderLine" WHERE "orderId" = $1', [orderId]);
    const invoiceId = globalThis.crypto ? globalThis.crypto.randomUUID() : require('crypto').randomUUID();
    const dueDate = data.dueDate ? new Date(data.dueDate).toISOString() : null;

    await this.prisma.sql(
      'INSERT INTO "Invoice" ("id", "invoiceNumber", "orderId", "storeId", "status", "totalAmount", "taxAmount", "discountAmount", "netAmount", "dueDate") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)',
      [invoiceId, data.invoiceNumber, order.id, order.storeId, 'UNPAID', order.totalAmount, order.taxAmount, order.discountAmount, order.netAmount, dueDate],
    );

    for (const line of lines) {
      const lineId = globalThis.crypto ? globalThis.crypto.randomUUID() : require('crypto').randomUUID();
      await this.prisma.sql(
        'INSERT INTO "InvoiceLine" ("id", "invoiceId", "skuId", "quantity", "unitPrice", "discountAmount", "taxRate", "taxAmount", "netAmount") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
        [lineId, invoiceId, line.skuId, line.quantity, line.unitPrice, line.discountAmount, line.taxRate, line.taxAmount, line.netAmount],
      );
    }

    const invoiceRows = await this.prisma.sql('SELECT * FROM "Invoice" WHERE "id" = $1 LIMIT 1', [invoiceId]);
    const invoice = invoiceRows[0];
    invoice.lines = await this.prisma.sql('SELECT * FROM "InvoiceLine" WHERE "invoiceId" = $1', [invoiceId]);
    return invoice;
  }

  async getInvoice(invoiceId: string) {
    const invoices = await this.prisma.sql('SELECT * FROM "Invoice" WHERE "id" = $1 LIMIT 1', [invoiceId]);
    if (invoices.length === 0) return null;
    const invoice = invoices[0];
    invoice.lines = await this.prisma.sql('SELECT * FROM "InvoiceLine" WHERE "invoiceId" = $1', [invoiceId]);
    invoice.payments = await this.prisma.sql('SELECT * FROM "Payment" WHERE "invoiceId" = $1', [invoiceId]);
    return invoice;
  }

  async getInvoices(storeId: string) {
    const invoices = await this.prisma.sql('SELECT * FROM "Invoice" WHERE "storeId" = $1', [storeId]);
    for (const inv of invoices) {
      inv.lines = await this.prisma.sql('SELECT * FROM "InvoiceLine" WHERE "invoiceId" = $1', [inv.id]);
    }
    return invoices;
  }
}
