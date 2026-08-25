import { PrismaService } from '../prisma/prisma.service';
import { Redis } from 'ioredis';
export declare class CatalogService {
    private readonly prisma;
    private readonly redis;
    constructor(prisma: PrismaService, redis: Redis);
    createCategory(data: {
        code: string;
        name: string;
    }): Promise<{
        code: string;
        name: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        description: string | null;
    }>;
    getCategories(): Promise<any>;
    updateCategory(id: number, data: {
        code?: string;
        name?: string;
    }): Promise<{
        code: string;
        name: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        description: string | null;
    }>;
    deleteCategory(id: number): Promise<{
        code: string;
        name: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        description: string | null;
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
    updateSubCategory(id: number, data: {
        code?: string;
        name?: string;
    }): Promise<{
        code: string;
        name: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        categoryId: number;
    }>;
    deleteSubCategory(id: number): Promise<{
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
        status: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        description: string | null;
        uom: string;
        hsnCode: string | null;
        categoryId: number;
        subcategoryId: number | null;
        fssaiNumber: string | null;
        imageUrl: string | null;
    }>;
    getProducts(): Promise<any>;
    updateProduct(id: number, data: any): Promise<{
        code: string;
        name: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        description: string | null;
        uom: string;
        hsnCode: string | null;
        categoryId: number;
        subcategoryId: number | null;
        fssaiNumber: string | null;
        imageUrl: string | null;
    }>;
    deleteProduct(id: number): Promise<{
        code: string;
        name: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        description: string | null;
        uom: string;
        hsnCode: string | null;
        categoryId: number;
        subcategoryId: number | null;
        fssaiNumber: string | null;
        imageUrl: string | null;
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
        productId: number;
        uom: string;
        skuCode: string;
        barcode: string | null;
        weight: number | null;
    }>;
    getSkuByCode(skuCode: string): Promise<any>;
}
