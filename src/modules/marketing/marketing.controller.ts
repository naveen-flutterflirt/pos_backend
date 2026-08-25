import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { MarketingService } from './marketing.service';

@Controller('marketing')
export class MarketingController {
  constructor(private readonly marketingService: MarketingService) {}

  @Post('coupons')
  createCoupon(@Body() body: any) {
    return this.marketingService.createCoupon(body);
  }

  @Get('coupons')
  getCoupons() {
    return this.marketingService.getCoupons();
  }

  @Delete('coupons/:id')
  deleteCoupon(@Param('id') id: string) {
    return this.marketingService.deleteCoupon(Number(id));
  }

  @Post('gift-cards')
  createGiftCard(@Body() body: any) {
    return this.marketingService.createGiftCard(body);
  }

  @Get('gift-cards')
  getGiftCards() {
    return this.marketingService.getGiftCards();
  }

  @Delete('gift-cards/:id')
  deleteGiftCard(@Param('id') id: string) {
    return this.marketingService.deleteGiftCard(Number(id));
  }
}
