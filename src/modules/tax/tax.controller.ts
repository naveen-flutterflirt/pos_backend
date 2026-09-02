import { Controller, Post, Body } from '@nestjs/common';
import { TaxService, TaxCalculationRequest } from './tax.service';

@Controller('tax')
export class TaxController {
  constructor(private readonly taxService: TaxService) {}

  @Post('calculate')
  async calculateTax(@Body() body: TaxCalculationRequest) {
    return this.taxService.calculateTax(body);
  }
}
