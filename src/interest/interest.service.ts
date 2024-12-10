import { Injectable } from '@nestjs/common';
import { PrismaService } from "prisma/prisma.service";
import { InterestDto } from './dto/interest.dto';

@Injectable()
export class InterestService {
  constructor(private prisma: PrismaService) { }

  async findAll() {
    return this.prisma.interest.findMany();
  }
}
