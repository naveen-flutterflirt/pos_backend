import { TaxService, TaxCalculationRequest } from './tax.service';
export declare class TaxController {
    private readonly taxService;
    constructor(taxService: TaxService);
    calculateTax(body: TaxCalculationRequest): Promise<import("./tax.service").TaxCalculationResult>;
}
