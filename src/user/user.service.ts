import { Injectable } from '@nestjs/common';
// import { UpdatePersonInput } from './dto/update-person.input';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateUserInput } from './dto/create-user.input';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserInput: CreateUserInput) {
    return await this.prisma.user.create({
      data: { ...createUserInput },
    });
  }

  async findById(id: string) {
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  // findOne(id: number) {
  //   return await this.prisma.person.find
  // }

  // update(id: number, updatePersonInput: UpdatePersonInput) {
  //   return await this.prisma.person.
  // }

  // remove(id: number) {
  //   return await this.prisma.person.
  // }
}
