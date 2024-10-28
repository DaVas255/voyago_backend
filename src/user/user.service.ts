import { Injectable } from "@nestjs/common";
import type { User } from "@prisma/client";
import { hash } from "argon2";

import { PrismaService } from "prisma/prisma.service";
import { AuthDto } from "@/auth/dto/auth.dto";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUsers() {
    return this.prisma.user.findMany({
      select: {
        name: true,
        email: true,
        id: true,
        password: false,
      },
    });
  }

  async getById(id: number) {
    id = Number(id);
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async getByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async create(dto: AuthDto) {
    return this.prisma.user.create({
      data: {
        ...dto,
        password: await hash(dto.password),
      },
    });
  }

  async update(id: number, data: Partial<User>) {
    data.age = Number(data.age);
    return this.prisma.user.update({
      where: {
        id,
      },
      data,
    });
  }
}
