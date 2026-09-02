import { BillingService } from './billing.service';
export declare class BillingController {
    private readonly billingService;
    constructor(billingService: BillingService);
    createInvoice(orderId: string, body: {
        invoiceNumber: string;
        dueDate?: Date;
    }): Promise<any>;
    getInvoice(id: string): Promise<any>;
    getInvoices(storeId: string): Promise<any[]>;
}
