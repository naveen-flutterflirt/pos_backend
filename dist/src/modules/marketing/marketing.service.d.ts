import { PrismaService } from '../prisma/prisma.service';
export declare class MarketingService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createCoupon(data: any): Promise<{
        id: number;
        code: string;
        name: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        discountType: string;
        discountValue: number;
        minimumOrder: number;
        startDate: Date;
        endDate: Date;
    }>;
    getCoupons(): Promise<{
        id: number;
        code: string;
        name: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        discountType: string;
        discountValue: number;
        minimumOrder: number;
        startDate: Date;
        endDate: Date;
    }[]>;
    deleteCoupon(id: number): Promise<{
        id: number;
        code: string;
        name: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        discountType: string;
        discountValue: number;
        minimumOrder: number;
        startDate: Date;
        endDate: Date;
    }>;
    createGiftCard(data: any): Promise<{
        id: number;
        code: string;
        name: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        startDate: Date;
        endDate: Date;
        value: number;
        redemptionDetails: string | null;
        issuedTo: string | null;
    }>;
    getGiftCards(): Promise<{
        id: number;
        code: string;
        name: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        startDate: Date;
        endDate: Date;
        value: number;
        redemptionDetails: string | null;
        issuedTo: string | null;
    }[]>;
    deleteGiftCard(id: number): Promise<{
        id: number;
        code: string;
        name: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        startDate: Date;
        endDate: Date;
        value: number;
        redemptionDetails: string | null;
        issuedTo: string | null;
    }>;
}
