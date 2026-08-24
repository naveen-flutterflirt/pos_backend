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
      },
    });

    // Invalidate users list cache on create
    await this.redis.del('users:all').catch(() => {});

    return user;
  }

  async findAll(): Promise<User[]> {
    const cacheKey = 'users:all';

    try {
      const cached = await this.redis.get(cacheKey);
      if (cached) {
        return JSON.parse(cached) as User[];
      }
    } catch {
      // Redis unavailable — fall through to DB
    }

    const users = await this.prisma.user.findMany();

    // Cache result (fire-and-forget, don't block response)
    this.redis
      .setex(cacheKey, CACHE_TTL, JSON.stringify(users))
      .catch(() => {});

    return users;
  }
}
