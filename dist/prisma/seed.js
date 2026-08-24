"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const adapter_pg_1 = require("@prisma/adapter-pg");
const pg_1 = require("pg");
const dotenv = require("dotenv");
dotenv.config();
const pool = new pg_1.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new adapter_pg_1.PrismaPg(pool);
const prisma = new client_1.PrismaClient({ adapter });
async function main() {
    console.log('Seeding dummy data...');
    const category = await prisma.category.upsert({
        where: { code: 'CAT001' },
        update: {},
        create: {
            code: 'CAT001',
            name: 'Spices',
            description: 'Various spices',
        },
    });
    const subCategory = await prisma.subCategory.upsert({
        where: { code: 'SUBCAT001' },
        update: {},
        create: {
            code: 'SUBCAT001',
            name: 'Powder Spices',
            categoryId: category.id,
        },
    });
    const products = [
        { code: 'PRD001', name: 'Turmeric Powder', uom: 'kg' },
        { code: 'PRD002', name: 'Red Chilli Powder', uom: 'kg' },
        { code: 'PRD003', name: 'Coriander Powder', uom: 'kg' },
    ];
    for (const p of products) {
        const product = await prisma.product.upsert({
            where: { code: p.code },
            update: {},
            create: {
                code: p.code,
                name: p.name,
                uom: p.uom,
                categoryId: category.id,
                subcategoryId: subCategory.id,
            },
        });
        await prisma.price.create({
            data: {
                productId: product.id,
                basePrice: 150.0,
                additionalCharges: 10.0,
                tax: 5.0,
                status: 'Active',
            },
        });
    }
    const invoices = [
        { invoiceNo: 'INV-1001', customerName: 'M.Ram', productName: 'Turmeric Powder', quantity: '01', discount: '10%', cgst: '2.5%', sgst: '2.5%', paymentType: 'UPI', receivedAmount: '1,450' },
        { invoiceNo: 'INV-1002', customerName: 'Sita', productName: 'Red Chilli Powder', quantity: '02', discount: '5%', cgst: '2.5%', sgst: '2.5%', paymentType: 'Card', receivedAmount: '2,100' },
        { invoiceNo: 'INV-1003', customerName: 'Lakshman', productName: 'Coriander Powder', quantity: '01', discount: '0%', cgst: '2.5%', sgst: '2.5%', paymentType: 'Cash', receivedAmount: '500' },
    ];
    for (const inv of invoices) {
        await prisma.invoice.upsert({
            where: { invoiceNo: inv.invoiceNo },
            update: {},
            create: inv,
        });
    }
    console.log('Seeding complete!');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map