import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { InterestService } from '@/interest/interest.service';
import { InterestController } from './interest.controller';


@Module({
  controllers: [InterestController],
  providers: [PrismaService, InterestService],
})
export class InterestModule { }
