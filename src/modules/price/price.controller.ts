import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { PriceService } from './price.service';

@Controller('price')
export class PriceController {
  constructor(private readonly priceService: PriceService) {}

  @Get()
  async getPrices() {
    return this.priceService.getPrices();
  }

  @Post()
  async createPrice(
    @Body()
    body: {
      productId: number;
      basePrice: number;
      additionalCharges?: number;
      tax?: number;
      status?: string;
    },
  ) {
    return this.priceService.createPrice(body);
  }

  @Put(':id')
  async updatePrice(
    @Param('id') id: string,
    @Body()
    body: {
      productId?: number;
      basePrice?: number;
      additionalCharges?: number;
      tax?: number;
      status?: string;
    },
  ) {
    return this.priceService.updatePrice(Number(id), body);
  }

  @Delete(':id')
  async deletePrice(@Param('id') id: string) {
    return this.priceService.deletePrice(Number(id));
  }
}
