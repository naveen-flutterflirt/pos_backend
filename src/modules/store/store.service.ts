import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Store } from '@prisma/client';

@Injectable()
export class StoreService {
  constructor(private prisma: PrismaService) {}

  async create(data: { name: string; code: string; address: string }): Promise<Store> {
    return this.prisma.store.create({
      data,
    });
  }

  async findAll(): Promise<Store[]> {
    return this.prisma.store.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number): Promise<Store> {
    const store = await this.prisma.store.findUnique({
      where: { id },
    });
    if (!store) {
      throw new NotFoundException(`Store with ID ${id} not found`);
    }
    return store;
  }

  async update(id: number, data: { name?: string; code?: string; address?: string }): Promise<Store> {
    const store = await this.prisma.store.findUnique({ where: { id } });
    if (!store) {
      throw new NotFoundException(`Store with ID ${id} not found`);
    }
    return this.prisma.store.update({
      where: { id },
      data,
    });
  }

  async remove(id: number): Promise<Store> {
    const store = await this.prisma.store.findUnique({ where: { id } });
    if (!store) {
      throw new NotFoundException(`Store with ID ${id} not found`);
    }
    return this.prisma.store.delete({
      where: { id },
    });
  }
}
