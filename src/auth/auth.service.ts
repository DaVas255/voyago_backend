import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'
import { verify } from 'argon2'
import { omit } from 'lodash'
import { Role, User } from '@prisma/client';

import { AuthDto } from './dto/auth.dto'
import { PrismaService } from 'prisma/prisma.service';
import { UserService } from '@/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private prisma: PrismaService,
    private userService: UserService
  ) { }

  private readonly TOKEN_EXPIRATION_ACCESS = '20s'
  private readonly TOKEN_EXPIRATION_REFRESH = '30s'

  async login(dto: AuthDto) {
    const user = await this.validateUser(dto)
    return this.buildResponseObject(user)
  }

  async register(dto: AuthDto) {
    const userExists = await this.userService.getByEmail(dto.email)
    if (userExists) {
      throw new BadRequestException('User already exists')
    }
    const user = await this.userService.create(dto)

    return this.buildResponseObject(user)
  }

  async getNewTokens(refreshToken: string) {
    const result = await this.jwt.verifyAsync(refreshToken)
    if (!result) {
      throw new UnauthorizedException('Invalid refresh token')
    }
    const user = await this.userService.getById(result.id)
    return this.buildResponseObject(user)
  }

  async buildResponseObject(user: User) {
    const tokens = await this.issueTokens(user.id.toString(), user.rights)
    return { user: this.omitPassword(user), ...tokens }
  }

  private async issueTokens(userId: string, rights: Role[]) {
    const payload = { id: userId, rights }
    const accessToken = this.jwt.sign(payload, {
      expiresIn: this.TOKEN_EXPIRATION_ACCESS
    })
    const refreshToken = this.jwt.sign(payload, {
      expiresIn: this.TOKEN_EXPIRATION_REFRESH
    })
    return { accessToken, refreshToken }
  }

  private async validateUser(dto: AuthDto) {
    const user = await this.userService.getByEmail(dto.email)
    if (!user) {
      throw new UnauthorizedException('Email or password invalid')
    }
    const isValid = await verify(user.password, dto.password)
    if (!isValid) {
      throw new UnauthorizedException('Email or password invalid')
    }
    return user
  }

  private omitPassword(user: User) {
    return omit(user, ['password'])
  }
}
