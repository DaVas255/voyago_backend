import { Injectable } from '@nestjs/common';
import { PrismaService } from "prisma/prisma.service";
import { OrderDto } from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) { }

  async create(userId: number, createOrderDto: OrderDto) {
    return this.prisma.order.create({
      data: {
        ...createOrderDto,
        startDate: new Date(createOrderDto.startDate).toISOString(),
        endDate: createOrderDto.endDate ? new Date(createOrderDto.endDate).toISOString() : undefined,
        userId: userId,
      },
    });
  }

  async findAll() {
    return this.prisma.order.findMany();
  }

  async findOne(id: number) {
    return this.prisma.order.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateOrderDto: OrderDto) {
    return this.prisma.order.update({
      where: { id },
      data: updateOrderDto,
    });
  }

  async remove(id: number) {
    return this.prisma.order.delete({
      where: { id },
    });
  }
}
