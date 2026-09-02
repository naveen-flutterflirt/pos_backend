import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  async processPayment(
    @Body()
    body: {
      invoiceId: string;
      method: string;
      amount: number;
      transactionId?: string;
    },
  ) {
    return this.paymentsService.processPayment(body);
  }

  @Get('invoices/:invoiceId')
  async getPayments(@Param('invoiceId') invoiceId: string) {
    return this.paymentsService.getPayments(invoiceId);
  }
}
