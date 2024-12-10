import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { PrismaService } from 'prisma/prisma.service';
import { InterestService } from '@/interest/interest.service';

@Module({
  controllers: [OrderController],
  providers: [OrderService, PrismaService, InterestService],
})
export class OrderModule { }
