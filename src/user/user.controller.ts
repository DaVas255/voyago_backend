import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Role, User } from '@prisma/client';

import { UserService } from './user.service';
import { Auth } from '@/auth/decorators/auth.decorator';
import { CurrentUser } from '@/auth/decorators/user.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Auth()
  @Get('profile')
  async getProfile(@CurrentUser('id') id: number) {
    return this.userService.getById(id)
  }

  @Auth(Role.ADMIN)
  @Get('list')
  async getList() {
    return this.userService.getUsers()
  }

  @Auth()
  @Patch('profile')
  async updateProfile(@CurrentUser('id') id: number, @Body() dto: User) {
    return this.userService.update(id, dto)
  }
}
