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
        id: number;
        code: string;
        name: string;
        description: string | null;
        status: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getCategories(page?: number, limit?: number): Promise<any>;
    updateCategory(id: number, data: {
        code?: string;
        name?: string;
    }): Promise<{
        id: number;
        code: string;
        name: string;
        description: string | null;
        status: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteCategory(id: number): Promise<{
        id: number;
        code: string;
        name: string;
        description: string | null;
        status: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    createSubCategory(categoryId: number, data: {
        code: string;
        name: string;
    }): Promise<{
        id: number;
        code: string;
        name: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        categoryId: number;
    }>;
    updateSubCategory(id: number, data: {
        code?: string;
        name?: string;
    }): Promise<{
        id: number;
        code: string;
        name: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        categoryId: number;
    }>;
    deleteSubCategory(id: number): Promise<{
        id: number;
        code: string;
        name: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
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
        id: number;
        code: string;
        name: string;
        description: string | null;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        categoryId: number;
        uom: string;
        hsnCode: string | null;
        subcategoryId: number | null;
        fssaiNumber: string | null;
        imageUrl: string | null;
    }>;
    getProducts(page?: number, limit?: number): Promise<any>;
    updateProduct(id: number, data: any): Promise<{
        id: number;
        code: string;
        name: string;
        description: string | null;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        categoryId: number;
        uom: string;
        hsnCode: string | null;
        subcategoryId: number | null;
        fssaiNumber: string | null;
        imageUrl: string | null;
    }>;
    deleteProduct(id: number): Promise<{
        id: number;
        code: string;
        name: string;
        description: string | null;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        categoryId: number;
        uom: string;
        hsnCode: string | null;
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
        id: number;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        uom: string;
        productId: number;
        skuCode: string;
        barcode: string | null;
        weight: number | null;
    }>;
    getSkuByCode(skuCode: string): Promise<any>;
    private invalidateCache;
}
