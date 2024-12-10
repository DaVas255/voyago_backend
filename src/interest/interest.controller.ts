import { Controller, Get, Post, Body } from '@nestjs/common';
import { InterestService } from './interest.service';
import { InterestDto } from './dto/interest.dto';

@Controller('interest')
export class InterestController {
  constructor(private readonly interestService: InterestService) { }

  @Get()
  findAll() {
    return this.interestService.findAll();
  }
}
