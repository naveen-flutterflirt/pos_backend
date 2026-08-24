import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { BillingService } from './billing.service';

@Controller('billing')
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  @Post('orders/:orderId/invoices')
  async createInvoice(@Param('orderId') orderId: string, @Body() body: { invoiceNumber: string; dueDate?: Date }) {
    return this.billingService.createInvoice(orderId, body);
  }

  @Get('invoices/:id')
  async getInvoice(@Param('id') id: string) {
    return this.billingService.getInvoice(id);
  }

  @Get('stores/:storeId/invoices')
  async getInvoices(@Param('storeId') storeId: string) {
    return this.billingService.getInvoices(storeId);
  }
}
