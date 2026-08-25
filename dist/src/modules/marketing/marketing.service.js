"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarketingService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let MarketingService = class MarketingService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createCoupon(data) {
        return this.prisma.coupon.create({
            data: {
                code: data.couponCode,
                name: data.couponName,
                discountType: data.discountType,
                discountValue: parseFloat(data.discountValue),
                minimumOrder: parseFloat(data.minimumOrder),
                startDate: new Date(data.startDate),
                endDate: new Date(data.endDate),
                status: data.status,
            },
        });
    }
    async getCoupons() {
        return this.prisma.coupon.findMany({
            orderBy: { createdAt: 'desc' },
        });
    }
    async deleteCoupon(id) {
        return this.prisma.coupon.delete({ where: { id } });
    }
    async createGiftCard(data) {
        return this.prisma.giftCard.create({
            data: {
                code: data.cardCode,
                name: data.cardName,
                value: parseFloat(data.cardValue),
                redemptionDetails: data.redemptionDetails,
                issuedTo: data.issuedTo,
                startDate: new Date(data.startDate),
                endDate: new Date(data.endDate),
                status: data.status,
            },
        });
    }
    async getGiftCards() {
        return this.prisma.giftCard.findMany({
            orderBy: { createdAt: 'desc' },
        });
    }
    async deleteGiftCard(id) {
        return this.prisma.giftCard.delete({ where: { id } });
    }
};
exports.MarketingService = MarketingService;
exports.MarketingService = MarketingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MarketingService);
//# sourceMappingURL=marketing.service.js.map