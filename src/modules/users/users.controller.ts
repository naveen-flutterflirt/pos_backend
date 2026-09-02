import { Controller, Get, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAllUsers(
    @Query('role') role?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string
  ) {
    const pageNumber = page ? Math.max(1, parseInt(page, 10)) : 1;
    const limitNumber = limit ? Math.max(1, parseInt(limit, 10)) : 50;
    return this.usersService.findAll(role, pageNumber, limitNumber);
  }

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() data: any) {
    return this.usersService.update(id, data);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
}
