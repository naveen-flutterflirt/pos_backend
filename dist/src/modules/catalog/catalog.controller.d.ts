import { CatalogService } from './catalog.service';
export declare class CatalogController {
    private readonly catalogService;
    constructor(catalogService: CatalogService);
    createCategory(body: {
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
    updateCategory(id: string, body: {
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
    deleteCategory(id: string): Promise<{
        code: string;
        name: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        description: string | null;
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
    updateSubCategory(id: string, body: {
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
    deleteSubCategory(id: string): Promise<{
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
    updateProduct(id: string, body: any): Promise<{
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
    deleteProduct(id: string): Promise<{
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
        productId: number;
        uom: string;
        skuCode: string;
        barcode: string | null;
        weight: number | null;
    }>;
    getSkuByCode(skuCode: string): Promise<any>;
}
