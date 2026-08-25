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
    await this.redis.del('categories_list');
    return category;
  }

  async getCategories() {
    const cached = await this.redis.get('categories_list');
    if (cached) return JSON.parse(cached);

    const categories = await this.prisma.category.findMany({
      include: { subcategories: true },
    });
    await this.redis.set(
      'categories_list',
      JSON.stringify(categories),
      'EX',
      60,
    );
    return categories;
  }

  async updateCategory(id: number, data: { code?: string; name?: string }) {
    const category = await this.prisma.category.update({
      where: { id },
      data,
    });
    await this.redis.del('categories_list');
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
    await this.redis.del('categories_list');
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
    await this.redis.del('categories_list');
    return subCat;
  }

  async updateSubCategory(id: number, data: { code?: string; name?: string }) {
    const subCat = await this.prisma.subCategory.update({
      where: { id },
      data,
    });
    await this.redis.del('categories_list');
    return subCat;
  }

  async deleteSubCategory(id: number) {
    const subCat = await this.prisma.subCategory.delete({
      where: { id },
    });
    await this.redis.del('categories_list');
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
    await this.redis.del('products_list');
    return product;
  }

  async getProducts() {
    const cached = await this.redis.get('products_list');
    if (cached) return JSON.parse(cached);

    const products = await this.prisma.product.findMany({
      include: {
        category: true,
        subcategory: true,
        skus: true,
      },
    });

    // Case-insensitive sort
    products.sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }));

    await this.redis.set('products_list', JSON.stringify(products), 'EX', 60);
    return products;
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
    await this.redis.del('products_list');
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
    await this.redis.del('products_list');
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
    await this.redis.del('products_list');
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
}
