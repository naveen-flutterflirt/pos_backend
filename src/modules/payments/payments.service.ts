import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PaymentsService {
  constructor(private readonly prisma: PrismaService) {}

  async processPayment(data: { invoiceId: string; method: string; amount: number; transactionId?: string }) {
    const invoices = await this.prisma.sql('SELECT * FROM "Invoice" WHERE "id" = $1 LIMIT 1', [data.invoiceId]);
    const invoice = invoices[0];

    if (!invoice) {
      throw new NotFoundException('Invoice not found');
    }

    const payments = await this.prisma.sql('SELECT * FROM "Payment" WHERE "invoiceId" = $1 AND "status" = $2', [data.invoiceId, 'SUCCESS']);
    const totalPaid = payments.reduce((sum, p) => sum + Number(p.amount), 0);
    const remainingAmount = Number(invoice.netAmount) - totalPaid;

    if (data.amount > remainingAmount) {
      throw new BadRequestException(`Payment amount exceeds outstanding balance. Outstanding: ${remainingAmount}`);
    }

    const id = globalThis.crypto ? globalThis.crypto.randomUUID() : require('crypto').randomUUID();
    const insertRows = await this.prisma.sql(
      'INSERT INTO "Payment" ("id", "invoiceId", "method", "amount", "transactionId", "status") VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [id, invoice.id, data.method, data.amount, data.transactionId || null, 'SUCCESS'],
    );
    const payment = insertRows[0];

    const newTotalPaid = totalPaid + data.amount;
    let newStatus = 'PARTIAL';
    if (newTotalPaid >= Number(invoice.netAmount)) {
      newStatus = 'PAID';
    }

    await this.prisma.sql('UPDATE "Invoice" SET "status" = $1 WHERE "id" = $2', [newStatus, invoice.id]);
    return payment;
  }

  async getPayments(invoiceId: string) {
    return this.prisma.sql('SELECT * FROM "Payment" WHERE "invoiceId" = $1', [invoiceId]);
  }
}
