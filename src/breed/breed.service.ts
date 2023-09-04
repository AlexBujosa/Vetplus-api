import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { AddBreedInput } from './graphql/input/add-breed.input';
import { Breed } from '@prisma/client';

@Injectable()
export class BreedService {
  constructor(private readonly prismaService: PrismaService) {}
  async createBreed(addBreedInput: AddBreedInput): Promise<boolean> {
    const result = await this.prismaService.breed.create({
      data: {
        ...addBreedInput,
      },
    });
    if (!result) return false;
    return true;
  }
  async getAllBreed(): Promise<Breed[]> {
    const result = await this.prismaService.breed.findMany();
    return result;
  }
}
