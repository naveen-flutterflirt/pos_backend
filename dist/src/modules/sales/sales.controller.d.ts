import { SalesService } from './sales.service';
export declare class SalesController {
    private readonly salesService;
    constructor(salesService: SalesService);
    createSalesOrder(body: {
        orderNumber: string;
        storeId: string;
        customerId?: string;
        lines: Array<{
            skuId: string;
            batchId?: string;
            quantity: number;
            unitPrice: number;
            discountAmount?: number;
            taxRate?: number;
        }>;
    }): Promise<any>;
    getSalesOrders(storeId: string): Promise<any[]>;
}
