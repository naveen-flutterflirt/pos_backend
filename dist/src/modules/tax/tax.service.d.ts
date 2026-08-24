export interface TaxCalculationRequest {
    country: string;
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
export declare class TaxService {
    calculateTax(request: TaxCalculationRequest): Promise<TaxCalculationResult>;
}
