import { CatalogService } from './catalog.service';
export declare class CatalogController {
    private readonly catalogService;
    constructor(catalogService: CatalogService);
    createCategory(body: {
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
    getCategories(page?: string, limit?: string): Promise<any>;
    updateCategory(id: string, body: {
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
    deleteCategory(id: string): Promise<{
        id: number;
        code: string;
        name: string;
        description: string | null;
        status: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    createSubCategory(categoryId: string, body: {
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
    updateSubCategory(id: string, body: {
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
    deleteSubCategory(id: string): Promise<{
        id: number;
        code: string;
        name: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
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
    getProducts(page?: string, limit?: string): Promise<any>;
    updateProduct(id: string, body: any): Promise<{
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
    deleteProduct(id: string): Promise<{
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
    createSku(productId: string, body: {
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
}
