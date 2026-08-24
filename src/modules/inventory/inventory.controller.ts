import { Controller, Get, Post, Body, Param, Req, UseGuards } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { CognitoAuthGuard } from '../auth/cognito.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('inventory')
@UseGuards(CognitoAuthGuard)
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get('stores/:storeId/balances')
  async getStockBalances(@Param('storeId') storeId: string) {
    return this.inventoryService.getStockBalances(storeId);
  }

  @Get('stores/:storeId/ledger')
  async getStockLedger(@Param('storeId') storeId: string) {
    return this.inventoryService.getStockLedger(storeId);
  }

  @Post('adjust')
  async adjustStock(
    @Body()
    body: {
      userId?: string;
      organizationId?: string;
      storeId: string;
      skuId: string;
      batchId?: string;
      movementType: string;
      quantity: number;
      unitCost: number;
      referenceType: string;
      referenceId: string;
      direction: 'IN' | 'OUT';
      auditedBy?: string;
      approvedBy?: string;
      metadata?: string;
    },
  ) {
    return this.inventoryService.adjustStock(
      body.userId || 'SYSTEM',
      body.organizationId || 'ORG_DEFAULT',
      body,
    );
  }

  @Post('batches')
  async createBatch(
    @Body()
    body: {
      skuId: string;
      batchNumber: string;
      manufacturingDate?: Date;
      expiryDate?: Date;
      storeId: string;
      vendorId: string;
      quantity: number;
      unitCost: number;
    },
  ) {
    return this.inventoryService.createBatch(body);
  }

  @Get('stores/:storeId/batches')
  async getBatches(@Param('storeId') storeId: string) {
    return this.inventoryService.getBatches(storeId);
  }
}
