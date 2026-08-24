import { PrismaService } from '../prisma/prisma.service';
export declare class PaymentsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    processPayment(data: {
        invoiceId: string;
        method: string;
        amount: number;
        transactionId?: string;
    }): Promise<any>;
    getPayments(invoiceId: string): Promise<any[]>;
}
