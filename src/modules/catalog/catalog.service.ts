import { Injectable, Inject } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Redis } from 'ioredis';

@Injectable()
export class CatalogService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject('REDIS_CLIENT') private readonly redis: Redis,
  ) {}

  async createCategory(data: { code: string; name: string }) {
    const category = await this.prisma.category.create({
      data: {
        code: data.code,
        name: data.name,
      },
    });
    await this.invalidateCache('categories_list:*');
    return category;
  }

  async getCategories(page: number = 1, limit: number = 50) {
    const cacheKey = `categories_list:page:${page}:limit:${limit}`;
    const cached = await this.redis.get(cacheKey);
    if (cached) return JSON.parse(cached);

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

  async updateCategory(id: number, data: { code?: string; name?: string }) {
    const category = await this.prisma.category.update({
      where: { id },
      data,
    });
    await this.invalidateCache('categories_list:*');
    return category;
  }

  async deleteCategory(id: number) {
    // Delete associated SKUs, Prices, and products
    const products = await this.prisma.product.findMany({
      where: { categoryId: id },
    });
    for (const p of products) {
      await this.prisma.sku.deleteMany({ where: { productId: p.id } });
      await this.prisma.price.deleteMany({ where: { productId: p.id } });
    }
    await this.prisma.product.deleteMany({ where: { categoryId: id } });

    // Delete associated subcategories
    await this.prisma.subCategory.deleteMany({ where: { categoryId: id } });

    const category = await this.prisma.category.delete({
      where: { id },
    });
    await this.invalidateCache('categories_list:*');
    return category;
  }

  async createSubCategory(
    categoryId: number,
    data: { code: string; name: string },
  ) {
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

  async updateSubCategory(id: number, data: { code?: string; name?: string }) {
    const subCat = await this.prisma.subCategory.update({
      where: { id },
      data,
    });
    await this.invalidateCache('categories_list:*');
    return subCat;
  }

  async deleteSubCategory(id: number) {
    const subCat = await this.prisma.subCategory.delete({
      where: { id },
    });
    await this.invalidateCache('categories_list:*');
    return subCat;
  }

  async createProduct(data: {
    code: string;
    name: string;
    description?: string;
    uom: string;
    hsnCode?: string;
    categoryId: number;
    subcategoryId?: number;
    fssaiNumber?: string;
    imageUrl?: string;
  }) {
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

  async getProducts(page: number = 1, limit: number = 50) {
    const cacheKey = `products_list:page:${page}:limit:${limit}`;
    const cached = await this.redis.get(cacheKey);
    if (cached) return JSON.parse(cached);

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

  async updateProduct(id: number, data: any) {
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

  async deleteProduct(id: number) {
    // Delete associated SKUs and Prices first to avoid foreign key constraint errors
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

  async createSku(
    productId: number,
    data: { skuCode: string; barcode?: string; uom: string; weight?: number },
  ) {
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

  async getSkuByCode(skuCode: string) {
    const cached = await this.redis.get(`sku_${skuCode}`);
    if (cached) return JSON.parse(cached);

    const sku = await this.prisma.sku.findUnique({
      where: { skuCode },
      include: { product: true },
    });
    if (sku) {
      await this.redis.set(`sku_${skuCode}`, JSON.stringify(sku), 'EX', 300);
    }
    return sku;
  }

  private async invalidateCache(pattern: string) {
    const keys = await this.redis.keys(pattern);
    if (keys.length > 0) {
      await this.redis.del(...keys);
    }
  }
}
