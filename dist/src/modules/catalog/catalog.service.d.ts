import { PrismaService } from '../prisma/prisma.service';
import { Redis } from 'ioredis';
export declare class CatalogService {
    private readonly prisma;
    private readonly redis;
    constructor(prisma: PrismaService, redis: Redis);
    createCategory(data: {
        code: string;
        name: string;
        description?: string;
    }): Promise<{
        code: string;
        name: string;
        description: string | null;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
    getCategories(): Promise<any>;
    updateCategory(id: number, data: {
        code?: string;
        name?: string;
        description?: string;
    }): Promise<{
        code: string;
        name: string;
        description: string | null;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
    deleteCategory(id: number): Promise<{
        code: string;
        name: string;
        description: string | null;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
    createSubCategory(categoryId: number, data: {
        code: string;
        name: string;
    }): Promise<{
        code: string;
        name: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        categoryId: number;
    }>;
    createProduct(data: {
        code: string;
        name: string;
        description?: string;
        uom: string;
        hsnCode?: string;
        categoryId: number;
        subcategoryId?: number;
        fssaiNumber?: string;
        imageUrl?: string;
    }): Promise<{
        code: string;
        name: string;
        description: string | null;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        categoryId: number;
        uom: string;
        hsnCode: string | null;
        fssaiNumber: string | null;
        imageUrl: string | null;
        subcategoryId: number | null;
    }>;
    getProducts(): Promise<any>;
    deleteProduct(id: number): Promise<{
        code: string;
        name: string;
        description: string | null;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        categoryId: number;
        uom: string;
        hsnCode: string | null;
        fssaiNumber: string | null;
        imageUrl: string | null;
        subcategoryId: number | null;
    }>;
    createSku(productId: number, data: {
        skuCode: string;
        barcode?: string;
        uom: string;
        weight?: number;
    }): Promise<{
        status: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        uom: string;
        skuCode: string;
        barcode: string | null;
        weight: number | null;
        productId: number;
    }>;
    getSkuByCode(skuCode: string): Promise<any>;
}
