import { PrismaService } from '../prisma/prisma.service';
import { InventoryService } from '../inventory/inventory.service';
export declare class ProcurementService {
    private readonly prisma;
    private readonly inventoryService;
    constructor(prisma: PrismaService, inventoryService: InventoryService);
    createGrn(data: {
        grnNumber: string;
        purchaseOrderId?: string;
        vendorId: string;
        storeId: string;
        description?: string;
        lines: Array<{
            skuId: string;
            orderedQty: number;
            receivedQty: number;
            rejectedQty?: number;
            unitCost: number;
            taxAmount?: number;
            batchNumber?: string;
            manufacturingDate?: Date;
            expiryDate?: Date;
        }>;
    }): Promise<any>;
    getGrns(storeId: string): Promise<any[]>;
}
