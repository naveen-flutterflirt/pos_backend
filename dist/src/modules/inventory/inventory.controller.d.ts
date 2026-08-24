import { InventoryService } from './inventory.service';
export declare class InventoryController {
    private readonly inventoryService;
    constructor(inventoryService: InventoryService);
    getStockBalances(storeId: string): Promise<any[]>;
    getStockLedger(storeId: string): Promise<any[]>;
    adjustStock(body: {
        userId?: string;
        organizationId?: string;
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
    }): Promise<{
        balance: any;
        ledger: any;
    }>;
    createBatch(body: {
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
