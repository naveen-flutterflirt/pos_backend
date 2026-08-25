import { Injectable, Inject } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { Redis } from 'ioredis';

const CACHE_TTL = 60; // seconds

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    @Inject('REDIS_CLIENT') private redis: Redis,
  ) {}

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
    await this.redis.del('users:all').catch(() => {});
    await this.redis.del('users:all:CASHIER').catch(() => {});
    await this.redis.del('users:all:INVENTORY').catch(() => {});

    return user;
  }

  async findAll(role?: string): Promise<User[]> {
    const cacheKey = role ? `users:all:${role}` : 'users:all';

    try {
      const cached = await this.redis.get(cacheKey);
      if (cached) {
        return JSON.parse(cached) as User[];
      }
    } catch {
      // Redis unavailable — fall through to DB
    }

    const whereClause = role ? { role } : {};
    const users = await this.prisma.user.findMany({ where: whereClause });

    // Cache result (fire-and-forget, don't block response)
    this.redis
      .setex(cacheKey, CACHE_TTL, JSON.stringify(users))
      .catch(() => {});

    return users;
  }

  async update(id: string, data: any): Promise<User> {
    const user = await this.prisma.user.update({
      where: { id },
      data: {
        ...(data.posAccess !== undefined && { posAccess: data.posAccess }),
        ...(data.name && { name: data.name }),
        ...(data.mobileNumber && { mobileNumber: data.mobileNumber }),
        ...(data.email && { email: data.email }),
      },
    });

    // Invalidate users list cache on update
    await this.redis.del('users:all').catch(() => {});
    await this.redis.del('users:all:CASHIER').catch(() => {});
    await this.redis.del('users:all:INVENTORY').catch(() => {});

    return user;
  }
}
