import { PrismaService } from '../prisma/prisma.service';
export declare class MarketingService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createCoupon(data: any): Promise<{
        code: string;
        name: string;
        discountType: string;
        discountValue: number;
        minimumOrder: number;
        startDate: Date;
        endDate: Date;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
    getCoupons(): Promise<{
        code: string;
        name: string;
        discountType: string;
        discountValue: number;
        minimumOrder: number;
        startDate: Date;
        endDate: Date;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }[]>;
    deleteCoupon(id: number): Promise<{
        code: string;
        name: string;
        discountType: string;
        discountValue: number;
        minimumOrder: number;
        startDate: Date;
        endDate: Date;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
    createGiftCard(data: any): Promise<{
        code: string;
        name: string;
        startDate: Date;
        endDate: Date;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        value: number;
        redemptionDetails: string | null;
        issuedTo: string | null;
    }>;
    getGiftCards(): Promise<{
        code: string;
        name: string;
        startDate: Date;
        endDate: Date;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        value: number;
        redemptionDetails: string | null;
        issuedTo: string | null;
    }[]>;
    deleteGiftCard(id: number): Promise<{
        code: string;
        name: string;
        startDate: Date;
        endDate: Date;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        value: number;
        redemptionDetails: string | null;
        issuedTo: string | null;
    }>;
}
