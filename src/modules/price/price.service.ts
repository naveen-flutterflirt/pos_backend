import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PriceService {
  constructor(private readonly prisma: PrismaService) {}

  async getPrices() {
    return this.prisma.price.findMany({
      include: {
        product: true,
      },
    });
  }

  async createPrice(data: {
    productId: number;
    basePrice: number;
    additionalCharges?: number;
    tax?: number;
    status?: string;
  }) {
    return this.prisma.price.create({
      data,
    });
  }

  async updatePrice(
    id: number,
    data: {
      productId?: number;
      basePrice?: number;
      additionalCharges?: number;
      tax?: number;
      status?: string;
    },
  ) {
    return this.prisma.price.update({
      where: { id },
      data,
    });
  }

  async deletePrice(id: number) {
    return this.prisma.price.delete({
      where: { id },
    });
  }
}
