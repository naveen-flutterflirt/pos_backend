import { PriceService } from './price.service';
export declare class PriceController {
    private readonly priceService;
    constructor(priceService: PriceService);
    getPrices(): Promise<({
        product: {
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
        };
    } & {
        status: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        productId: number;
        basePrice: number;
        additionalCharges: number | null;
        tax: number | null;
    })[]>;
    createPrice(body: {
        productId: number;
        basePrice: number;
        additionalCharges?: number;
        tax?: number;
        status?: string;
    }): Promise<{
        status: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        productId: number;
        basePrice: number;
        additionalCharges: number | null;
        tax: number | null;
    }>;
    updatePrice(id: string, body: {
        productId?: number;
        basePrice?: number;
        additionalCharges?: number;
        tax?: number;
        status?: string;
    }): Promise<{
        status: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        productId: number;
        basePrice: number;
        additionalCharges: number | null;
        tax: number | null;
    }>;
    deletePrice(id: string): Promise<{
        status: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        productId: number;
        basePrice: number;
        additionalCharges: number | null;
        tax: number | null;
    }>;
}
