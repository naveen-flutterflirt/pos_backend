"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaxService = void 0;
const common_1 = require("@nestjs/common");
let TaxService = class TaxService {
    async calculateTax(request) {
        if (request.country.toUpperCase() === 'IN') {
            const isInterState = request.state && request.state.toUpperCase() !== 'KA';
            const rate = 18;
            const taxAmount = request.taxableAmount * (rate / 100);
            return {
                taxRate: rate,
                taxAmount,
                jurisdiction: request.state || 'IN',
                taxType: isInterState ? 'IGST' : 'CGST_SGST',
            };
        }
        else if (request.country.toUpperCase() === 'US') {
            const stateTaxRates = {
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
};
exports.TaxService = TaxService;
exports.TaxService = TaxService = __decorate([
    (0, common_1.Injectable)()
], TaxService);
//# sourceMappingURL=tax.service.js.map