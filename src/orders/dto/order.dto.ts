import { IsString, IsOptional, IsDate, IsNumber, IsBoolean } from 'class-validator';

export class OrderDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  location: string;

  @IsDate()
  startDate: Date;

  @IsDate()
  endDate?: Date;

  @IsBoolean()
  isCompleted: boolean;
}
