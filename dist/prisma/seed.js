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
    console.log('🌱 Seeding database with genuine products...');
    const categoryData = [
        { code: 'SPICE', name: 'Spices & Masalas' },
        { code: 'GRAIN', name: 'Grains, Rice & Pulses' },
        { code: 'OIL', name: 'Oils & Ghee' },
        { code: 'DAIRY', name: 'Dairy & Eggs' },
        { code: 'BEVER', name: 'Beverages & Drinks' },
        { code: 'SNACK', name: 'Snacks & Namkeen' },
        { code: 'CLEAN', name: 'Cleaning & Household' },
        { code: 'PCARE', name: 'Personal Care' },
        { code: 'ELEC', name: 'Electronics' },
        { code: 'FASH', name: 'Fashion & Apparel' },
    ];
    for (const cat of categoryData) {
        await prisma.category.upsert({ where: { code: cat.code }, update: {}, create: cat });
    }
    const cats = await prisma.category.findMany();
    const cid = (code) => cats.find(c => c.code === code).id;
    const subCategoryData = [
        { code: 'PWDR', name: 'Powder Spices', categoryId: cid('SPICE') },
        { code: 'WHOLE', name: 'Whole Spices', categoryId: cid('SPICE') },
        { code: 'RICE', name: 'Rice & Flour', categoryId: cid('GRAIN') },
        { code: 'PULSE', name: 'Pulses & Lentils', categoryId: cid('GRAIN') },
        { code: 'COOKOIL', name: 'Cooking Oils', categoryId: cid('OIL') },
        { code: 'GHEE', name: 'Ghee & Butter', categoryId: cid('OIL') },
        { code: 'MILK', name: 'Milk & Curd', categoryId: cid('DAIRY') },
        { code: 'CHEESE', name: 'Cheese & Paneer', categoryId: cid('DAIRY') },
        { code: 'TEACOF', name: 'Tea & Coffee', categoryId: cid('BEVER') },
        { code: 'JUICE', name: 'Juices & Soft Drinks', categoryId: cid('BEVER') },
        { code: 'CHIPS', name: 'Chips & Crisps', categoryId: cid('SNACK') },
        { code: 'BISCUIT', name: 'Biscuits & Cookies', categoryId: cid('SNACK') },
        { code: 'DETERG', name: 'Detergents & Cleaners', categoryId: cid('CLEAN') },
        { code: 'DISH', name: 'Dish & Utensil Care', categoryId: cid('CLEAN') },
        { code: 'SOAP', name: 'Soaps & Hand Wash', categoryId: cid('PCARE') },
        { code: 'HAIR', name: 'Hair Care', categoryId: cid('PCARE') },
        { code: 'MOB', name: 'Mobile Phones', categoryId: cid('ELEC') },
        { code: 'ACC', name: 'Accessories', categoryId: cid('ELEC') },
        { code: 'MENS', name: "Men's Wear", categoryId: cid('FASH') },
        { code: 'WOMENS', name: "Women's Wear", categoryId: cid('FASH') },
    ];
    for (const sub of subCategoryData) {
        await prisma.subCategory.upsert({ where: { code: sub.code }, update: {}, create: sub });
    }
    const subs = await prisma.subCategory.findMany();
    const sid = (code) => subs.find(s => s.code === code).id;
    const productData = [
        { code: 'SP-P-001', name: 'Turmeric Powder (Haldi)', uom: 'kg', hsnCode: '0910', cat: 'SPICE', sub: 'PWDR', price: 120, tax: 5 },
        { code: 'SP-P-002', name: 'Red Chilli Powder', uom: 'kg', hsnCode: '0904', cat: 'SPICE', sub: 'PWDR', price: 180, tax: 5 },
        { code: 'SP-P-003', name: 'Coriander Powder (Dhania)', uom: 'kg', hsnCode: '0909', cat: 'SPICE', sub: 'PWDR', price: 110, tax: 5 },
        { code: 'SP-P-004', name: 'Cumin Powder (Jeera)', uom: 'kg', hsnCode: '0909', cat: 'SPICE', sub: 'PWDR', price: 280, tax: 5 },
        { code: 'SP-P-005', name: 'Garam Masala', uom: 'kg', hsnCode: '0910', cat: 'SPICE', sub: 'PWDR', price: 320, tax: 5 },
        { code: 'SP-P-006', name: 'Kitchen King Masala', uom: 'kg', hsnCode: '0910', cat: 'SPICE', sub: 'PWDR', price: 290, tax: 5 },
        { code: 'SP-P-007', name: 'Amchur (Dry Mango Powder)', uom: 'kg', hsnCode: '0813', cat: 'SPICE', sub: 'PWDR', price: 200, tax: 5 },
        { code: 'SP-W-001', name: 'Black Pepper Whole', uom: 'kg', hsnCode: '0904', cat: 'SPICE', sub: 'WHOLE', price: 650, tax: 5 },
        { code: 'SP-W-002', name: 'Green Cardamom (Elaichi)', uom: 'kg', hsnCode: '0908', cat: 'SPICE', sub: 'WHOLE', price: 1800, tax: 5 },
        { code: 'SP-W-003', name: 'Cloves (Laung)', uom: 'kg', hsnCode: '0907', cat: 'SPICE', sub: 'WHOLE', price: 1100, tax: 5 },
        { code: 'SP-W-004', name: 'Bay Leaves (Tejpatta)', uom: 'kg', hsnCode: '0910', cat: 'SPICE', sub: 'WHOLE', price: 220, tax: 5 },
        { code: 'SP-W-005', name: 'Cumin Seeds (Jeera)', uom: 'kg', hsnCode: '0909', cat: 'SPICE', sub: 'WHOLE', price: 260, tax: 5 },
        { code: 'GR-R-001', name: 'Basmati Rice (Aged)', uom: 'kg', hsnCode: '1006', cat: 'GRAIN', sub: 'RICE', price: 85, tax: 0 },
        { code: 'GR-R-002', name: 'Sona Masuri Rice', uom: 'kg', hsnCode: '1006', cat: 'GRAIN', sub: 'RICE', price: 55, tax: 0 },
        { code: 'GR-R-003', name: 'Whole Wheat Flour (Atta)', uom: 'kg', hsnCode: '1101', cat: 'GRAIN', sub: 'RICE', price: 42, tax: 0 },
        { code: 'GR-R-004', name: 'Maida (Refined Flour)', uom: 'kg', hsnCode: '1101', cat: 'GRAIN', sub: 'RICE', price: 36, tax: 0 },
        { code: 'GR-R-005', name: 'Besan (Chickpea Flour)', uom: 'kg', hsnCode: '1106', cat: 'GRAIN', sub: 'RICE', price: 68, tax: 0 },
        { code: 'GR-R-006', name: 'Poha (Flattened Rice)', uom: 'kg', hsnCode: '1006', cat: 'GRAIN', sub: 'RICE', price: 50, tax: 0 },
        { code: 'GR-PL-001', name: 'Toor Dal (Arhar Dal)', uom: 'kg', hsnCode: '0713', cat: 'GRAIN', sub: 'PULSE', price: 130, tax: 0 },
        { code: 'GR-PL-002', name: 'Moong Dal (Split)', uom: 'kg', hsnCode: '0713', cat: 'GRAIN', sub: 'PULSE', price: 120, tax: 0 },
        { code: 'GR-PL-003', name: 'Chana Dal (Split Chickpea)', uom: 'kg', hsnCode: '0713', cat: 'GRAIN', sub: 'PULSE', price: 90, tax: 0 },
        { code: 'GR-PL-004', name: 'Masoor Dal (Red Lentil)', uom: 'kg', hsnCode: '0713', cat: 'GRAIN', sub: 'PULSE', price: 100, tax: 0 },
        { code: 'GR-PL-005', name: 'Urad Dal (Black Gram)', uom: 'kg', hsnCode: '0713', cat: 'GRAIN', sub: 'PULSE', price: 115, tax: 0 },
        { code: 'OL-C-001', name: 'Sunflower Oil', uom: 'ltr', hsnCode: '1512', cat: 'OIL', sub: 'COOKOIL', price: 145, tax: 5 },
        { code: 'OL-C-002', name: 'Groundnut Oil (Cold Pressed)', uom: 'ltr', hsnCode: '1508', cat: 'OIL', sub: 'COOKOIL', price: 195, tax: 5 },
        { code: 'OL-C-003', name: 'Mustard Oil', uom: 'ltr', hsnCode: '1514', cat: 'OIL', sub: 'COOKOIL', price: 175, tax: 5 },
        { code: 'OL-C-004', name: 'Extra Virgin Olive Oil', uom: 'ltr', hsnCode: '1509', cat: 'OIL', sub: 'COOKOIL', price: 850, tax: 12 },
        { code: 'OL-G-001', name: 'Pure Cow Ghee', uom: 'kg', hsnCode: '0405', cat: 'OIL', sub: 'GHEE', price: 680, tax: 12 },
        { code: 'OL-G-002', name: 'Buffalo Ghee', uom: 'kg', hsnCode: '0405', cat: 'OIL', sub: 'GHEE', price: 580, tax: 12 },
        { code: 'DR-M-001', name: 'Full Cream Milk (Packet)', uom: 'ltr', hsnCode: '0401', cat: 'DAIRY', sub: 'MILK', price: 58, tax: 0 },
        { code: 'DR-M-002', name: 'Toned Milk', uom: 'ltr', hsnCode: '0401', cat: 'DAIRY', sub: 'MILK', price: 52, tax: 0 },
        { code: 'DR-M-003', name: 'Plain Curd (Dahi)', uom: 'kg', hsnCode: '0403', cat: 'DAIRY', sub: 'MILK', price: 60, tax: 5 },
        { code: 'DR-C-001', name: 'Paneer (Fresh)', uom: 'kg', hsnCode: '0406', cat: 'DAIRY', sub: 'CHEESE', price: 320, tax: 12 },
        { code: 'DR-C-002', name: 'Processed Cheese Slices', uom: 'pcs', hsnCode: '0406', cat: 'DAIRY', sub: 'CHEESE', price: 140, tax: 12 },
        { code: 'BV-T-001', name: 'Tata Tea Premium (500g)', uom: 'pcs', hsnCode: '0902', cat: 'BEVER', sub: 'TEACOF', price: 185, tax: 5 },
        { code: 'BV-T-002', name: 'Brooke Bond Red Label Tea', uom: 'pcs', hsnCode: '0902', cat: 'BEVER', sub: 'TEACOF', price: 210, tax: 5 },
        { code: 'BV-T-003', name: 'Nescafe Classic Coffee (200g)', uom: 'pcs', hsnCode: '2101', cat: 'BEVER', sub: 'TEACOF', price: 395, tax: 12 },
        { code: 'BV-T-004', name: 'Bru Instant Coffee (200g)', uom: 'pcs', hsnCode: '2101', cat: 'BEVER', sub: 'TEACOF', price: 280, tax: 12 },
        { code: 'BV-J-001', name: 'Real Fruit Juice - Mango (1L)', uom: 'pcs', hsnCode: '2009', cat: 'BEVER', sub: 'JUICE', price: 99, tax: 12 },
        { code: 'BV-J-002', name: 'Tropicana Orange Juice (1L)', uom: 'pcs', hsnCode: '2009', cat: 'BEVER', sub: 'JUICE', price: 89, tax: 12 },
        { code: 'BV-J-003', name: 'Coca-Cola (500ml)', uom: 'pcs', hsnCode: '2202', cat: 'BEVER', sub: 'JUICE', price: 40, tax: 12 },
        { code: 'BV-J-004', name: 'Sprite (500ml)', uom: 'pcs', hsnCode: '2202', cat: 'BEVER', sub: 'JUICE', price: 40, tax: 12 },
        { code: 'SN-CH-001', name: "Lay's Classic Salted Chips", uom: 'pcs', hsnCode: '2005', cat: 'SNACK', sub: 'CHIPS', price: 20, tax: 12 },
        { code: 'SN-CH-002', name: 'Kurkure Masala Munch', uom: 'pcs', hsnCode: '2005', cat: 'SNACK', sub: 'CHIPS', price: 20, tax: 12 },
        { code: 'SN-CH-003', name: 'Haldirams Aloo Bhujia (400g)', uom: 'pcs', hsnCode: '2106', cat: 'SNACK', sub: 'CHIPS', price: 75, tax: 12 },
        { code: 'SN-CH-004', name: 'Pringles Original (165g)', uom: 'pcs', hsnCode: '2005', cat: 'SNACK', sub: 'CHIPS', price: 190, tax: 12 },
        { code: 'SN-B-001', name: 'Parle-G Biscuits (800g)', uom: 'pcs', hsnCode: '1905', cat: 'SNACK', sub: 'BISCUIT', price: 45, tax: 12 },
        { code: 'SN-B-002', name: 'Britannia Bourbon Biscuits', uom: 'pcs', hsnCode: '1905', cat: 'SNACK', sub: 'BISCUIT', price: 40, tax: 12 },
        { code: 'SN-B-003', name: 'Oreo Cookies (Original 120g)', uom: 'pcs', hsnCode: '1905', cat: 'SNACK', sub: 'BISCUIT', price: 35, tax: 12 },
        { code: 'SN-B-004', name: 'Good Day Cashew Cookies', uom: 'pcs', hsnCode: '1905', cat: 'SNACK', sub: 'BISCUIT', price: 50, tax: 12 },
        { code: 'CL-D-001', name: 'Surf Excel Matic (2kg)', uom: 'pcs', hsnCode: '3402', cat: 'CLEAN', sub: 'DETERG', price: 380, tax: 18 },
        { code: 'CL-D-002', name: 'Ariel Liquid Detergent (1L)', uom: 'pcs', hsnCode: '3402', cat: 'CLEAN', sub: 'DETERG', price: 290, tax: 18 },
        { code: 'CL-D-003', name: 'Lizol Floor Cleaner (1L)', uom: 'pcs', hsnCode: '3805', cat: 'CLEAN', sub: 'DETERG', price: 145, tax: 18 },
        { code: 'CL-DH-001', name: 'Harpic Toilet Cleaner (1L)', uom: 'pcs', hsnCode: '3805', cat: 'CLEAN', sub: 'DISH', price: 120, tax: 18 },
        { code: 'CL-DH-002', name: 'Vim Dishwash Bar (200g)', uom: 'pcs', hsnCode: '3402', cat: 'CLEAN', sub: 'DISH', price: 25, tax: 18 },
        { code: 'CL-DH-003', name: 'Colin Glass & Surface Cleaner', uom: 'pcs', hsnCode: '3805', cat: 'CLEAN', sub: 'DISH', price: 99, tax: 18 },
        { code: 'PC-S-001', name: 'Dove Moisturising Bar (100g)', uom: 'pcs', hsnCode: '3401', cat: 'PCARE', sub: 'SOAP', price: 55, tax: 18 },
        { code: 'PC-S-002', name: 'Dettol Original Soap (75g)', uom: 'pcs', hsnCode: '3401', cat: 'PCARE', sub: 'SOAP', price: 45, tax: 18 },
        { code: 'PC-S-003', name: 'Lifebuoy Total Hand Wash (200ml)', uom: 'pcs', hsnCode: '3401', cat: 'PCARE', sub: 'SOAP', price: 85, tax: 18 },
        { code: 'PC-H-001', name: 'Head & Shoulders Shampoo (400ml)', uom: 'pcs', hsnCode: '3305', cat: 'PCARE', sub: 'HAIR', price: 285, tax: 18 },
        { code: 'PC-H-002', name: 'Pantene Pro-V Conditioner (340g)', uom: 'pcs', hsnCode: '3305', cat: 'PCARE', sub: 'HAIR', price: 250, tax: 18 },
        { code: 'PC-H-003', name: 'Parachute Coconut Oil (500ml)', uom: 'pcs', hsnCode: '1513', cat: 'PCARE', sub: 'HAIR', price: 145, tax: 12 },
        { code: 'PC-H-004', name: 'Sunsilk Strong & Long Shampoo', uom: 'pcs', hsnCode: '3305', cat: 'PCARE', sub: 'HAIR', price: 199, tax: 18 },
        { code: 'EL-M-001', name: 'Samsung Galaxy A15 (4G, 128GB)', uom: 'pcs', hsnCode: '8517', cat: 'ELEC', sub: 'MOB', price: 13999, tax: 18 },
        { code: 'EL-M-002', name: 'Redmi Note 13 (128GB)', uom: 'pcs', hsnCode: '8517', cat: 'ELEC', sub: 'MOB', price: 17499, tax: 18 },
        { code: 'EL-M-003', name: 'Realme C65 (6GB/128GB)', uom: 'pcs', hsnCode: '8517', cat: 'ELEC', sub: 'MOB', price: 11499, tax: 18 },
        { code: 'EL-A-001', name: 'boAt Bassheads 100 Earphones', uom: 'pcs', hsnCode: '8518', cat: 'ELEC', sub: 'ACC', price: 299, tax: 18 },
        { code: 'EL-A-002', name: 'USB Type-C Charging Cable (1m)', uom: 'pcs', hsnCode: '8544', cat: 'ELEC', sub: 'ACC', price: 199, tax: 18 },
        { code: 'EL-A-003', name: '20000mAh Power Bank', uom: 'pcs', hsnCode: '8507', cat: 'ELEC', sub: 'ACC', price: 1299, tax: 18 },
        { code: 'FS-M-001', name: "Men's Cotton Crew T-Shirt", uom: 'pcs', hsnCode: '6109', cat: 'FASH', sub: 'MENS', price: 399, tax: 5 },
        { code: 'FS-M-002', name: "Men's Slim Fit Jeans", uom: 'pcs', hsnCode: '6203', cat: 'FASH', sub: 'MENS', price: 999, tax: 5 },
        { code: 'FS-M-003', name: "Men's Formal Shirt (Full Sleeve)", uom: 'pcs', hsnCode: '6205', cat: 'FASH', sub: 'MENS', price: 799, tax: 5 },
        { code: 'FS-W-001', name: "Women's Cotton Kurti", uom: 'pcs', hsnCode: '6106', cat: 'FASH', sub: 'WOMENS', price: 599, tax: 5 },
        { code: 'FS-W-002', name: "Women's Salwar Kameez Set", uom: 'pcs', hsnCode: '6211', cat: 'FASH', sub: 'WOMENS', price: 1299, tax: 5 },
        { code: 'FS-W-003', name: "Women's Palazzo Pants", uom: 'pcs', hsnCode: '6204', cat: 'FASH', sub: 'WOMENS', price: 449, tax: 5 },
    ];
    let productCount = 0;
    for (const p of productData) {
        const product = await prisma.product.upsert({
            where: { code: p.code },
            update: {},
            create: {
                code: p.code,
                name: p.name,
                uom: p.uom,
                hsnCode: p.hsnCode,
                categoryId: cid(p.cat),
                subcategoryId: sid(p.sub),
                status: 'Active',
            },
        });
        const existingPrice = await prisma.price.findFirst({ where: { productId: product.id } });
        if (!existingPrice) {
            await prisma.price.create({
                data: {
                    productId: product.id,
                    basePrice: p.price,
                    additionalCharges: 0,
                    tax: p.tax,
                    status: 'Active',
                },
            });
        }
        const skuCode = `${p.code}-SKU1`;
        await prisma.sku.upsert({
            where: { skuCode },
            update: {},
            create: {
                productId: product.id,
                skuCode,
                uom: p.uom,
                status: 'Active',
            },
        });
        productCount++;
    }
    const storeData = [
        { code: 'STR001', name: 'Mumbai Central Hub', address: '123 Main St, Mumbai', state: 'Maharashtra' },
        { code: 'STR002', name: 'Delhi NCR Outlet', address: '45 Connaught Place, Delhi', state: 'Delhi' },
        { code: 'STR003', name: 'Bangalore Tech Park', address: 'Electronic City, Bangalore', state: 'Karnataka' },
        { code: 'STR004', name: 'Chennai Express Store', address: 'T Nagar, Chennai', state: 'Tamil Nadu' },
        { code: 'STR005', name: 'Kolkata Bazaar', address: 'Park Street, Kolkata', state: 'West Bengal' },
        { code: 'STR006', name: 'Hyderabad Market', address: 'Banjara Hills, Hyderabad', state: 'Telangana' },
        { code: 'STR007', name: 'Pune Westend', address: 'Aundh, Pune', state: 'Maharashtra' },
        { code: 'STR008', name: 'Ahmedabad Traders', address: 'CG Road, Ahmedabad', state: 'Gujarat' },
        { code: 'STR009', name: 'Jaipur Royals', address: 'MI Road, Jaipur', state: 'Rajasthan' },
        { code: 'STR010', name: 'Lucknow Nawabs', address: 'Hazratganj, Lucknow', state: 'Uttar Pradesh' },
    ];
    for (const store of storeData) {
        await prisma.store.upsert({ where: { code: store.code }, update: {}, create: store });
    }
    const invoices = [
        { invoiceNo: 'INV-1001', customerName: 'M.Ram', productName: 'Turmeric Powder', quantity: '01', discount: '10%', cgst: '2.5%', sgst: '2.5%', paymentType: 'UPI', receivedAmount: '1,450' },
        { invoiceNo: 'INV-1002', customerName: 'Sita Devi', productName: 'Red Chilli Powder', quantity: '02', discount: '5%', cgst: '2.5%', sgst: '2.5%', paymentType: 'Card', receivedAmount: '2,100' },
        { invoiceNo: 'INV-1003', customerName: 'Lakshman K.', productName: 'Basmati Rice', quantity: '05', discount: '0%', cgst: '0%', sgst: '0%', paymentType: 'Cash', receivedAmount: '425' },
        { invoiceNo: 'INV-1004', customerName: 'Arjun Kumar', productName: 'Sunflower Oil', quantity: '02', discount: '0%', cgst: '2.5%', sgst: '2.5%', paymentType: 'UPI', receivedAmount: '305' },
        { invoiceNo: 'INV-1005', customerName: 'Meena Patel', productName: 'Pure Cow Ghee', quantity: '01', discount: '5%', cgst: '6%', sgst: '6%', paymentType: 'Card', receivedAmount: '646' },
    ];
    for (const inv of invoices) {
        await prisma.invoice.upsert({ where: { invoiceNo: inv.invoiceNo }, update: {}, create: inv });
    }
    const users = [
        { name: 'Rahul Sharma', email: 'rahul.cashier@example.com', mobileNumber: '9876543210', password: 'password123', role: 'CASHIER', store: 'Delhi NCR Outlet', posAccess: true },
        { name: 'Priya Patel', email: 'priya.cashier@example.com', mobileNumber: '8765432109', password: 'password123', role: 'CASHIER', store: 'Mumbai Central Hub', posAccess: true },
        { name: 'Amit Singh', email: 'amit.cashier@example.com', mobileNumber: '7654321098', password: 'password123', role: 'CASHIER', store: 'Bangalore Tech Park', posAccess: false },
        { name: 'Sneha Gupta', email: 'sneha.inv@example.com', mobileNumber: '6543210987', password: 'password123', role: 'INVENTORY', store: 'Delhi NCR Outlet', posAccess: true },
        { name: 'Vikram Verma', email: 'vikram.inv@example.com', mobileNumber: '5432109876', password: 'password123', role: 'INVENTORY', store: 'Mumbai Central Hub', posAccess: true },
        { name: 'Anjali Desai', email: 'anjali.inv@example.com', mobileNumber: '4321098765', password: 'password123', role: 'INVENTORY', store: 'Chennai Express Store', posAccess: false },
    ];
    for (const user of users) {
        await prisma.user.upsert({ where: { email: user.email }, update: {}, create: user });
    }
    console.log(`✅ Seeding complete! ${productCount} products upserted across ${categoryData.length} categories.`);
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
});
//# sourceMappingURL=seed.js.map