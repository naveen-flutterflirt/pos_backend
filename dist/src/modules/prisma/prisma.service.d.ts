import { OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
export declare class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    private pool;
    constructor();
    sql(query: string, params?: any[]): Promise<any[]>;
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
}
