import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { StoreService } from './store.service';

@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Post()
  create(
    @Body()
    data: {
      name: string;
      code: string;
      address: string;
      state?: string;
    },
  ) {
    return this.storeService.create(data);
  }

  @Get()
  findAll() {
    return this.storeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.storeService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    data: { name?: string; code?: string; address?: string; state?: string },
  ) {
    return this.storeService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.storeService.remove(id);
  }
}
