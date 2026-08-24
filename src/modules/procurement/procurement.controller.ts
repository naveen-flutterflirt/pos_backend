import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ProcurementService } from './procurement.service';

@Controller('procurement')
export class ProcurementController {
  constructor(private readonly procurementService: ProcurementService) {}

  @Post('grns')
  async createGrn(
    @Body()
    body: {
      grnNumber: string;
      purchaseOrderId?: string;
      vendorId: string;
      storeId: string;
      description?: string;
      lines: Array<{
        skuId: string;
        orderedQty: number;
        receivedQty: number;
        rejectedQty?: number;
        unitCost: number;
        taxAmount?: number;
        batchNumber?: string;
        manufacturingDate?: Date;
        expiryDate?: Date;
      }>;
    },
  ) {
    return this.procurementService.createGrn(body);
  }

  @Get('stores/:storeId/grns')
  async getGrns(@Param('storeId') storeId: string) {
    return this.procurementService.getGrns(storeId);
  }
}
