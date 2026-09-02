import { PrismaService } from '../prisma/prisma.service';
export declare class BillingService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createInvoice(orderId: string, data: {
        invoiceNumber: string;
        dueDate?: Date;
    }): Promise<any>;
    getInvoice(invoiceId: string): Promise<any>;
    getInvoices(storeId: string): Promise<any[]>;
}
