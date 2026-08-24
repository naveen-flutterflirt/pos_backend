import { PaymentsService } from './payments.service';
export declare class PaymentsController {
    private readonly paymentsService;
    constructor(paymentsService: PaymentsService);
    processPayment(body: {
        invoiceId: string;
        method: string;
        amount: number;
        transactionId?: string;
    }): Promise<any>;
    getPayments(invoiceId: string): Promise<any[]>;
}
