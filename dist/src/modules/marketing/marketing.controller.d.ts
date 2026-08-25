import { MarketingService } from './marketing.service';
export declare class MarketingController {
    private readonly marketingService;
    constructor(marketingService: MarketingService);
    createCoupon(body: any): Promise<{
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
    deleteCoupon(id: string): Promise<{
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
    createGiftCard(body: any): Promise<{
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
    deleteGiftCard(id: string): Promise<{
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
