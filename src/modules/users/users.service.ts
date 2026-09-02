import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { Redis } from 'ioredis';
import * as bcrypt from 'bcrypt';

const CACHE_TTL = 60; // seconds

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    @Inject('REDIS_CLIENT') private redis: Redis,
  ) { }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findByMobile(mobileNumber: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { mobileNumber },
    });
  }

  async create(data: any): Promise<User> {
    const user = await this.prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        mobileNumber: data.mobileNumber,
        password: data.password,
        role: data.role || 'CASHIER',
        store: data.store || null,
      },
    });

    // Invalidate users list cache on create
    await this.invalidateCache('users:all*').catch(() => { });

    return user;
  }

  async findAll(role?: string, page: number = 1, limit: number = 50): Promise<any> {
    const cacheKey = role ? `users:all:${role}:page:${page}:limit:${limit}` : `users:all:page:${page}:limit:${limit}`;

    try {
      const cached = await this.redis.get(cacheKey);
      if (cached) {
        return JSON.parse(cached);
      }
    } catch {
      // Redis unavailable — fall through to DB
    }

    const whereClause = role ? { role } : {};
    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        where: whereClause,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' }
      }),
      this.prisma.user.count({ where: whereClause })
    ]);

    const result = {
      data: users,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) }
    };

    // Cache result (fire-and-forget, don't block response)
    this.redis
      .setex(cacheKey, CACHE_TTL, JSON.stringify(result))
      .catch(() => { });

    return result;
  }

  async update(id: string, data: any): Promise<User> {
    const updateData: any = {
      ...(data.posAccess !== undefined && { posAccess: data.posAccess }),
      ...(data.name && { name: data.name }),
      ...(data.mobileNumber && { mobileNumber: data.mobileNumber }),
      ...(data.email && { email: data.email }),
    };

    if (data.password && data.password.trim() !== '' && data.password !== '********') {
      updateData.password = await bcrypt.hash(data.password, 10);
    }

    const user = await this.prisma.user.update({
      where: { id },
      data: updateData,
    });

    // Invalidate users list cache on update
    await this.invalidateCache('users:all*').catch(() => { });

    return user;
  }

  async delete(id: string): Promise<User> {
    try {
      const user = await this.prisma.user.delete({
        where: { id },
      });

      // Invalidate users list cache on delete
      await this.invalidateCache('users:all*').catch(() => { });

      return user;
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new NotFoundException('User not found');
      }
      throw error;
    }
  }

  private async invalidateCache(pattern: string) {
    const keys = await this.redis.keys(pattern);
    if (keys.length > 0) {
      await this.redis.del(...keys);
    }
  }
}
