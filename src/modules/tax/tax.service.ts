import { Injectable } from '@nestjs/common';

export interface TaxCalculationRequest {
  country: string; // US, IN
  state?: string;
  taxableAmount: number;
  hsnCode?: string;
}

export interface TaxCalculationResult {
  taxRate: number;
  taxAmount: number;
  jurisdiction: string;
  taxType: string;
}

@Injectable()
export class TaxService {
  async calculateTax(
    request: TaxCalculationRequest,
  ): Promise<TaxCalculationResult> {
    if (request.country.toUpperCase() === 'IN') {
      // Default India GST strategy
      const isInterState =
        request.state && request.state.toUpperCase() !== 'KA'; // assuming base state is KA
      const rate = 18; // 18% standard rate
      const taxAmount = request.taxableAmount * (rate / 100);

      return {
        taxRate: rate,
        taxAmount,
        jurisdiction: request.state || 'IN',
        taxType: isInterState ? 'IGST' : 'CGST_SGST',
      };
    } else if (request.country.toUpperCase() === 'US') {
      // US Sales Tax strategy
      const stateTaxRates: Record<string, number> = {
        NY: 4.0,
        CA: 7.25,
        TX: 6.25,
      };
      const rate = stateTaxRates[request.state?.toUpperCase() || ''] || 0;
      const taxAmount = request.taxableAmount * (rate / 100);

      return {
        taxRate: rate,
        taxAmount,
        jurisdiction: request.state || 'US',
        taxType: 'SALES_TAX',
      };
    }

    return {
      taxRate: 0,
      taxAmount: 0,
      jurisdiction: 'NONE',
      taxType: 'EXEMPT',
    };
  }
}
