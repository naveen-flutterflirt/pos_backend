import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CognitoAuthGuard } from '../auth/cognito.guard';
import { CatalogService } from './catalog.service';

@Controller('catalog')
@UseGuards(CognitoAuthGuard)
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @Post('categories')
  async createCategory(@Body() body: { code: string; name: string }) {
    return this.catalogService.createCategory(body);
  }

  @Get('categories')
  async getCategories() {
    return this.catalogService.getCategories();
  }

  @Put('categories/:id')
  async updateCategory(
    @Param('id') id: string,
    @Body() body: { code?: string; name?: string },
  ) {
    return this.catalogService.updateCategory(Number(id), body);
  }

  @Delete('categories/:id')
  async deleteCategory(@Param('id') id: string) {
    return this.catalogService.deleteCategory(Number(id));
  }

  @Post('categories/:categoryId/subcategories')
  async createSubCategory(
    @Param('categoryId') categoryId: string,
    @Body() body: { code: string; name: string },
  ) {
    return this.catalogService.createSubCategory(Number(categoryId), body);
  }

  @Put('subcategories/:id')
  async updateSubCategory(
    @Param('id') id: string,
    @Body() body: { code?: string; name?: string },
  ) {
    return this.catalogService.updateSubCategory(Number(id), body);
  }

  @Delete('subcategories/:id')
  async deleteSubCategory(@Param('id') id: string) {
    return this.catalogService.deleteSubCategory(Number(id));
  }

  @Post('products')
  async createProduct(
    @Body()
    body: {
      code: string;
      name: string;
      description?: string;
      uom: string;
      hsnCode?: string;
      categoryId: number;
      subcategoryId?: number;
      fssaiNumber?: string;
      imageUrl?: string;
    },
  ) {
    return this.catalogService.createProduct(body);
  }

  @Get('products')
  async getProducts() {
    return this.catalogService.getProducts();
  }

  @Put('products/:id')
  async updateProduct(@Param('id') id: string, @Body() body: any) {
    return this.catalogService.updateProduct(Number(id), body);
  }

  @Delete('products/:id')
  async deleteProduct(@Param('id') id: string) {
    return this.catalogService.deleteProduct(Number(id));
  }

  @Post('products/:productId/skus')
  async createSku(
    @Param('productId') productId: string,
    @Body()
    body: { skuCode: string; barcode?: string; uom: string; weight?: number },
  ) {
    return this.catalogService.createSku(Number(productId), body);
  }

  @Get('skus/:skuCode')
  async getSkuByCode(@Param('skuCode') skuCode: string) {
    return this.catalogService.getSkuByCode(skuCode);
  }
}
