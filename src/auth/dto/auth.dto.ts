//src/auth/dto/login.dto.ts
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class AuthDto {
  @IsEmail()
  @IsOptional()
  email: string;

  @MinLength(6, {
    message: 'Password must be at least 6 characters long',
  })
  @IsString()
  password: string;

  @IsOptional()
  verificationToken: string;
}
