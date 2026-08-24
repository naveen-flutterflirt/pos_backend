import { CatalogService } from './catalog.service';
export declare class CatalogController {
    private readonly catalogService;
    constructor(catalogService: CatalogService);
    createCategory(body: {
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
    updateCategory(id: string, body: {
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
    deleteCategory(id: string): Promise<{
        code: string;
        name: string;
        description: string | null;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
    createSubCategory(categoryId: string, body: {
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
    createProduct(body: {
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
    deleteProduct(id: string): Promise<{
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
    createSku(productId: string, body: {
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
