import { Injectable } from '@nestjs/common';
// import { UpdatePersonInput } from './dto/update-person.input';
import { PrismaService } from '@/prisma/prisma.service';
import { CreatePersonInput } from './dto/create-person.input';

@Injectable()
export class PersonService {
  constructor(private prisma: PrismaService) {}

  async create(createPersonInput: CreatePersonInput) {
    return await this.prisma.person.create({
      data: { ...createPersonInput },
    });
  }

  async findAll() {
    return await this.prisma.person.findMany();
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
