import { PriceService } from './price.service';
export declare class PriceController {
    private readonly priceService;
    constructor(priceService: PriceService);
    getPrices(): Promise<({
        product: {
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
        };
    } & {
        id: number;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        basePrice: number;
        additionalCharges: number | null;
        tax: number | null;
        productId: number;
    })[]>;
    createPrice(body: {
        productId: number;
        basePrice: number;
        additionalCharges?: number;
        tax?: number;
        status?: string;
    }): Promise<{
        id: number;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        basePrice: number;
        additionalCharges: number | null;
        tax: number | null;
        productId: number;
    }>;
    updatePrice(id: string, body: {
        productId?: number;
        basePrice?: number;
        additionalCharges?: number;
        tax?: number;
        status?: string;
    }): Promise<{
        id: number;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        basePrice: number;
        additionalCharges: number | null;
        tax: number | null;
        productId: number;
    }>;
    deletePrice(id: string): Promise<{
        id: number;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        basePrice: number;
        additionalCharges: number | null;
        tax: number | null;
        productId: number;
    }>;
}
