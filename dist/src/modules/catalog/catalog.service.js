"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatalogService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const ioredis_1 = require("ioredis");
let CatalogService = class CatalogService {
    constructor(prisma, redis) {
        this.prisma = prisma;
        this.redis = redis;
    }
    async createCategory(data) {
        const category = await this.prisma.category.create({
            data: {
                code: data.code,
                name: data.name,
            },
        });
        await this.invalidateCache('categories_list:*');
        return category;
    }
    async getCategories(page = 1, limit = 50) {
        const cacheKey = `categories_list:page:${page}:limit:${limit}`;
        const cached = await this.redis.get(cacheKey);
        if (cached)
            return JSON.parse(cached);
        const skip = (page - 1) * limit;
        const [categories, total] = await this.prisma.$transaction([
            this.prisma.category.findMany({
                skip,
                take: limit,
                include: { subcategories: true },
            }),
            this.prisma.category.count()
        ]);
        const result = {
            data: categories,
            meta: { total, page, limit, totalPages: Math.ceil(total / limit) }
        };
        await this.redis.set(cacheKey, JSON.stringify(result), 'EX', 60);
        return result;
    }
    async updateCategory(id, data) {
        const category = await this.prisma.category.update({
            where: { id },
            data,
        });
        await this.invalidateCache('categories_list:*');
        return category;
    }
    async deleteCategory(id) {
        const products = await this.prisma.product.findMany({
            where: { categoryId: id },
        });
        for (const p of products) {
            await this.prisma.sku.deleteMany({ where: { productId: p.id } });
            await this.prisma.price.deleteMany({ where: { productId: p.id } });
        }
        await this.prisma.product.deleteMany({ where: { categoryId: id } });
        await this.prisma.subCategory.deleteMany({ where: { categoryId: id } });
        const category = await this.prisma.category.delete({
            where: { id },
        });
        await this.invalidateCache('categories_list:*');
        return category;
    }
    async createSubCategory(categoryId, data) {
        const subCat = await this.prisma.subCategory.create({
            data: {
                categoryId,
                code: data.code,
                name: data.name,
            },
        });
        await this.invalidateCache('categories_list:*');
        return subCat;
    }
    async updateSubCategory(id, data) {
        const subCat = await this.prisma.subCategory.update({
            where: { id },
            data,
        });
        await this.invalidateCache('categories_list:*');
        return subCat;
    }
    async deleteSubCategory(id) {
        const subCat = await this.prisma.subCategory.delete({
            where: { id },
        });
        await this.invalidateCache('categories_list:*');
        return subCat;
    }
    async createProduct(data) {
        const product = await this.prisma.product.create({
            data: {
                code: data.code,
                name: data.name,
                description: data.description,
                uom: data.uom,
                hsnCode: data.hsnCode,
                categoryId: data.categoryId,
                subcategoryId: data.subcategoryId,
                fssaiNumber: data.fssaiNumber,
                imageUrl: data.imageUrl,
            },
        });
        await this.invalidateCache('products_list:*');
        return product;
    }
    async getProducts(page = 1, limit = 50) {
        const cacheKey = `products_list:page:${page}:limit:${limit}`;
        const cached = await this.redis.get(cacheKey);
        if (cached)
            return JSON.parse(cached);
        const skip = (page - 1) * limit;
        const [products, total] = await this.prisma.$transaction([
            this.prisma.product.findMany({
                skip,
                take: limit,
                include: {
                    category: true,
                    subcategory: true,
                    skus: true,
                },
                orderBy: {
                    name: 'asc'
                }
            }),
            this.prisma.product.count()
        ]);
        const result = {
            data: products,
            meta: { total, page, limit, totalPages: Math.ceil(total / limit) }
        };
        await this.redis.set(cacheKey, JSON.stringify(result), 'EX', 60);
        return result;
    }
    async updateProduct(id, data) {
        const product = await this.prisma.product.update({
            where: { id },
            data: {
                code: data.code,
                name: data.name,
                description: data.description,
                uom: data.uom,
                hsnCode: data.hsnCode,
            },
        });
        await this.invalidateCache('products_list:*');
        return product;
    }
    async deleteProduct(id) {
        await this.prisma.sku.deleteMany({
            where: { productId: id },
        });
        await this.prisma.price.deleteMany({
            where: { productId: id },
        });
        const product = await this.prisma.product.delete({
            where: { id },
        });
        await this.invalidateCache('products_list:*');
        return product;
    }
    async createSku(productId, data) {
        const sku = await this.prisma.sku.create({
            data: {
                productId,
                skuCode: data.skuCode,
                barcode: data.barcode,
                uom: data.uom,
                weight: data.weight,
            },
        });
        await this.invalidateCache('products_list:*');
        await this.redis.del(`sku_${data.skuCode}`);
        return sku;
    }
    async getSkuByCode(skuCode) {
        const cached = await this.redis.get(`sku_${skuCode}`);
        if (cached)
            return JSON.parse(cached);
        const sku = await this.prisma.sku.findUnique({
            where: { skuCode },
            include: { product: true },
        });
        if (sku) {
            await this.redis.set(`sku_${skuCode}`, JSON.stringify(sku), 'EX', 300);
        }
        return sku;
    }
    async invalidateCache(pattern) {
        const keys = await this.redis.keys(pattern);
        if (keys.length > 0) {
            await this.redis.del(...keys);
        }
    }
};
exports.CatalogService = CatalogService;
exports.CatalogService = CatalogService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)('REDIS_CLIENT')),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        ioredis_1.Redis])
], CatalogService);
//# sourceMappingURL=catalog.service.js.map