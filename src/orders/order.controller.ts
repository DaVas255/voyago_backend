import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderDto } from './dto/order.dto';
import { CurrentUser } from '@/auth/decorators/user.decorator';
import { Auth } from "@/auth/decorators/auth.decorator";

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @Auth()
  @Post()
  create(@CurrentUser("id") id: number, @Body() createOrderDto: OrderDto) {
    return this.orderService.create(id, createOrderDto);
  }

  @Auth()
  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Auth()
  @Get('active')
  findAllActive() {
    return this.orderService.findAllActive();
  }

  @Auth()
  @Get('user')
  findByUserId(@CurrentUser("id") id: number) {
    return this.orderService.findByUserId(id);
  }

  @Auth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @Auth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: OrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @Auth()
  @Patch(':id/complete')
  complete(@Param('id') id: string) {
    return this.orderService.complete(+id);
  }

  @Auth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
