
import { IsString, IsOptional, IsDate, IsNumber } from 'class-validator';

export class OrderDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  location: string;

  @IsDate()
  startDate: Date;

  @IsOptional()
  @IsDate()
  endDate?: Date;
}
