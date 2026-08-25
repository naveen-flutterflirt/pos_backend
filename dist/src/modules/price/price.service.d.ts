import { PrismaService } from '../prisma/prisma.service';
export declare class PriceService {
    private readonly prisma;
    constructor(prisma: PrismaService);
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
    createPrice(data: {
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
    updatePrice(id: number, data: {
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
    deletePrice(id: number): Promise<{
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
