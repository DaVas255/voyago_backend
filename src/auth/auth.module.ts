import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { getJwtConfig } from '@/config/jwt.config'
import { UserModule } from '@/user/user.module'
import { JwtStrategy } from './strategies/jwt.strategy'
import { PrismaService } from 'prisma/prisma.service';
import { RefreshTokenService } from './refresh-token.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [
    JwtStrategy,
    PrismaService,
    AuthService,
    RefreshTokenService,
  ]
})
export class AuthModule { }
