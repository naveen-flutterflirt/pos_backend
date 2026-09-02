import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class InvoiceService {
  constructor(private readonly prisma: PrismaService) {}

  async getInvoices() {
    return this.prisma.invoice.findMany();
  }

  async createInvoice(data: {
    invoiceNo: string;
    customerName: string;
    customerPhone?: string;
    productName: string;
    quantity: string;
    discount: string;
    cgst: string;
    sgst: string;
    paymentType: string;
    receivedAmount: string;
    status?: string;
  }) {
    return this.prisma.invoice.create({
      data,
    });
  }

  async updateInvoice(
    id: number,
    data: {
      invoiceNo?: string;
      customerName?: string;
      customerPhone?: string;
      productName?: string;
      quantity?: string;
      discount?: string;
      cgst?: string;
      sgst?: string;
      paymentType?: string;
      receivedAmount?: string;
      status?: string;
    },
  ) {
    return this.prisma.invoice.update({
      where: { id },
      data,
    });
  }

  async deleteInvoice(id: number) {
    return this.prisma.invoice.delete({
      where: { id },
    });
  }
}
