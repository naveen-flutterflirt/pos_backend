import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { InvoiceService } from './invoice.service';

@Controller('invoices')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Get()
  async getInvoices() {
    return this.invoiceService.getInvoices();
  }

  @Post()
  async createInvoice(
    @Body()
    body: {
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
    },
  ) {
    return this.invoiceService.createInvoice(body);
  }

  @Put(':id')
  async updateInvoice(
    @Param('id') id: string,
    @Body()
    body: {
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
    return this.invoiceService.updateInvoice(Number(id), body);
  }

  @Delete(':id')
  async deleteInvoice(@Param('id') id: string) {
    return this.invoiceService.deleteInvoice(Number(id));
  }
}
