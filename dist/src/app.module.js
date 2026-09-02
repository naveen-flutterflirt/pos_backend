"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const config_1 = require("@nestjs/config");
const prisma_module_1 = require("./modules/prisma/prisma.module");
const users_module_1 = require("./modules/users/users.module");
const auth_module_1 = require("./modules/auth/auth.module");
const catalog_module_1 = require("./modules/catalog/catalog.module");
const inventory_module_1 = require("./modules/inventory/inventory.module");
const procurement_module_1 = require("./modules/procurement/procurement.module");
const sales_module_1 = require("./modules/sales/sales.module");
const billing_module_1 = require("./modules/billing/billing.module");
const payments_module_1 = require("./modules/payments/payments.module");
const tax_module_1 = require("./modules/tax/tax.module");
const redis_module_1 = require("./modules/redis/redis.module");
const store_module_1 = require("./modules/store/store.module");
const upload_module_1 = require("./modules/upload/upload.module");
const price_module_1 = require("./modules/price/price.module");
const invoice_module_1 = require("./modules/invoice/invoice.module");
const marketing_module_1 = require("./modules/marketing/marketing.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            prisma_module_1.PrismaModule,
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            catalog_module_1.CatalogModule,
            inventory_module_1.InventoryModule,
            procurement_module_1.ProcurementModule,
            sales_module_1.SalesModule,
            billing_module_1.BillingModule,
            payments_module_1.PaymentsModule,
            tax_module_1.TaxModule,
            redis_module_1.RedisModule,
            store_module_1.StoreModule,
            upload_module_1.UploadModule,
            price_module_1.PriceModule,
            invoice_module_1.InvoiceModule,
            marketing_module_1.MarketingModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map