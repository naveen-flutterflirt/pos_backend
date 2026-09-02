import { PrismaService } from '../prisma/prisma.service';
export declare class PriceService {
    private readonly prisma;
    constructor(prisma: PrismaService);
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
        productId: number;
        basePrice: number;
        additionalCharges: number | null;
        tax: number | null;
    })[]>;
    createPrice(data: {
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
        productId: number;
        basePrice: number;
        additionalCharges: number | null;
        tax: number | null;
    }>;
    updatePrice(id: number, data: {
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
        productId: number;
        basePrice: number;
        additionalCharges: number | null;
        tax: number | null;
    }>;
    deletePrice(id: number): Promise<{
        id: number;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        productId: number;
        basePrice: number;
        additionalCharges: number | null;
        tax: number | null;
    }>;
}
