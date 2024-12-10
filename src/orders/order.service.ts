import { Injectable } from '@nestjs/common';
import { PrismaService } from "prisma/prisma.service";
import { OrderDto } from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) { }

  async create(userId: number, createOrderDto: OrderDto) {
    return this.prisma.order.create({
      data: {
        title: createOrderDto.title,
        description: createOrderDto.description,
        location: createOrderDto.location,
        startDate: new Date(createOrderDto.startDate).toISOString(),
        endDate: createOrderDto.endDate
          ? new Date(createOrderDto.endDate).toISOString()
          : undefined,
        userId,
        interests: {
          connect: createOrderDto.interests.map(id => ({ id })),
        },
      },
    });
  }

  async findAll() {
    return this.prisma.order.findMany({
      include: {
        user: {
          select: {
            name: true,
          },
        },
        interests: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async findAllActive() {
    return this.prisma.order.findMany({
      where: { isCompleted: false },
      include: {
        user: {
          select: {
            name: true,
          },
        },
        interests: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async findByUserId(userId: number) {
    return this.prisma.order.findMany({
      where: { userId },
      include: {
        interests: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async complete(id: number) {
    return this.prisma.order.update({
      where: { id },
      data: {
        isCompleted: true,
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.order.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            name: true,
          },
        },
        interests: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async update(id: number, updateOrderDto: OrderDto) {
    return this.prisma.order.update({
      where: { id },
      data: {
        title: updateOrderDto.title,
        description: updateOrderDto.description,
        location: updateOrderDto.location,
        startDate: new Date(updateOrderDto.startDate).toISOString(),
        endDate: updateOrderDto.endDate
          ? new Date(updateOrderDto.endDate).toISOString()
          : undefined,
        interests: {
          connect: updateOrderDto.interests.map(id => ({ id })),
        },
      }
    });
  }

  async remove(id: number) {
    return this.prisma.order.delete({
      where: { id },
    });
  }
}
