import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MarketingService {
  constructor(private readonly prisma: PrismaService) {}

  // --- COUPONS ---
  async createCoupon(data: any) {
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

  async deleteCoupon(id: number) {
    return this.prisma.coupon.delete({ where: { id } });
  }

  // --- GIFT CARDS ---
  async createGiftCard(data: any) {
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

  async deleteGiftCard(id: number) {
    return this.prisma.giftCard.delete({ where: { id } });
  }
}
