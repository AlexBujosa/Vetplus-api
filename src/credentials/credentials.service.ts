import { Injectable } from '@nestjs/common';
// import { UpdatePersonInput } from './dto/update-person.input';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateCredentialsInput } from './dto/create-credentials.input';

@Injectable()
export class CredentialsService {
  constructor(private prisma: PrismaService) {}

  async create(createCredentialsInput: CreateCredentialsInput) {
    return await this.prisma.credentials.create({
      data: { ...createCredentialsInput },
    });
  }

  async findById(id_user: string) {
    return await this.prisma.credentials.findUnique({
      where: {
        id_user,
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
