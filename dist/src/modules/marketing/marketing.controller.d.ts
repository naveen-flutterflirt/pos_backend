import { MarketingService } from './marketing.service';
export declare class MarketingController {
    private readonly marketingService;
    constructor(marketingService: MarketingService);
    createCoupon(body: any): Promise<{
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
    deleteCoupon(id: string): Promise<{
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
    createGiftCard(body: any): Promise<{
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
    deleteGiftCard(id: string): Promise<{
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
