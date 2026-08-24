import { PrismaService } from '../prisma/prisma.service';
import { Store } from '@prisma/client';
export declare class StoreService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: {
        name: string;
        code: string;
        address: string;
    }): Promise<Store>;
    findAll(): Promise<Store[]>;
    findOne(id: number): Promise<Store>;
    update(id: number, data: {
        name?: string;
        code?: string;
        address?: string;
    }): Promise<Store>;
    remove(id: number): Promise<Store>;
}
