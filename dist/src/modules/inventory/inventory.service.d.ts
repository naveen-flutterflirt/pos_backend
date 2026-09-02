import { PrismaService } from '../prisma/prisma.service';
export declare class InventoryService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getStockBalances(storeId: string): Promise<any[]>;
    getStockLedger(storeId: string): Promise<any[]>;
    adjustStock(userId: string, organizationId: string, data: {
        storeId: string;
        skuId: string;
        batchId?: string;
        movementType: string;
        quantity: number;
        unitCost: number;
        referenceType: string;
        referenceId: string;
        direction: 'IN' | 'OUT';
        auditedBy?: string;
        approvedBy?: string;
        metadata?: string;
    }, txClient?: any): Promise<{
        balance: any;
        ledger: any;
    }>;
    createBatch(data: {
        skuId: string;
        batchNumber: string;
        manufacturingDate?: Date;
        expiryDate?: Date;
        storeId: string;
        vendorId: string;
        quantity: number;
        unitCost: number;
    }): Promise<any>;
    getBatches(storeId: string): Promise<any[]>;
}
