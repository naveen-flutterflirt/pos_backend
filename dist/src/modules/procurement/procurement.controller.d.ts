import { ProcurementService } from './procurement.service';
export declare class ProcurementController {
    private readonly procurementService;
    constructor(procurementService: ProcurementService);
    createGrn(body: {
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
