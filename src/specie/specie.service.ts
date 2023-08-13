import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { AddSpecieInput } from './graphql/input/add-specie.input';

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
}
