import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { AddSpecieInput } from './graphql/input/add-specie.input';
import { Specie } from '@prisma/client';

@Injectable()
export class SpecieService {
  constructor(private readonly prismaService: PrismaService) {}
  async createSpecie(addSpecietInput: AddSpecieInput): Promise<boolean> {
    const result = await this.prismaService.specie.create({
      data: {
        ...addSpecietInput,
      },
    });
    if (!result) return false;
    return true;
  }
  async getAllSpecie(): Promise<Specie[]> {
    const result = await this.prismaService.specie.findMany();
    return result;
  }
}
