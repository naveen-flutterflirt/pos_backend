import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './modules/prisma/prisma.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { CatalogModule } from './modules/catalog/catalog.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { ProcurementModule } from './modules/procurement/procurement.module';
import { SalesModule } from './modules/sales/sales.module';
import { BillingModule } from './modules/billing/billing.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { TaxModule } from './modules/tax/tax.module';
import { RedisModule } from './modules/redis/redis.module';
import { StoreModule } from './modules/store/store.module';
import { UploadModule } from './modules/upload/upload.module';
import { PriceModule } from './modules/price/price.module';
import { InvoiceModule } from './modules/invoice/invoice.module';
import { MarketingModule } from './modules/marketing/marketing.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    UsersModule,
    AuthModule,
    CatalogModule,
    InventoryModule,
    ProcurementModule,
    SalesModule,
    BillingModule,
    PaymentsModule,
    TaxModule,
    RedisModule,
    StoreModule,
    UploadModule,
    PriceModule,
    InvoiceModule,
    MarketingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
