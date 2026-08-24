import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { SalesService } from './sales.service';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Post('orders')
  async createSalesOrder(
    @Body()
    body: {
      orderNumber: string;
      storeId: string;
      customerId?: string;
      lines: Array<{
        skuId: string;
        batchId?: string;
        quantity: number;
        unitPrice: number;
        discountAmount?: number;
        taxRate?: number;
      }>;
    },
  ) {
    return this.salesService.createSalesOrder(body);
  }

  @Get('stores/:storeId/orders')
  async getSalesOrders(@Param('storeId') storeId: string) {
    return this.salesService.getSalesOrders(storeId);
  }
}
