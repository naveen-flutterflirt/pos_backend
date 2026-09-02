import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { Redis } from 'ioredis';
export declare class UsersService {
    private prisma;
    private redis;
    constructor(prisma: PrismaService, redis: Redis);
    findByEmail(email: string): Promise<User | null>;
    findByMobile(mobileNumber: string): Promise<User | null>;
    create(data: any): Promise<User>;
    findAll(role?: string, page?: number, limit?: number): Promise<any>;
    update(id: string, data: any): Promise<User>;
    delete(id: string): Promise<User>;
    private invalidateCache;
}
