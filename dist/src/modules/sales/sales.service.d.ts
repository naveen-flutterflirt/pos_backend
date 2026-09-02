import { PrismaService } from '../prisma/prisma.service';
import { InventoryService } from '../inventory/inventory.service';
export declare class SalesService {
    private readonly prisma;
    private readonly inventoryService;
    constructor(prisma: PrismaService, inventoryService: InventoryService);
    createSalesOrder(data: {
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
