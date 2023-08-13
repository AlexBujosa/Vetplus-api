import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { AddPetInput } from './graphql/input/add-pet.input';
import { UpdatePetInput } from './graphql/input/update-pet.input';
import { DeletePetInput } from './graphql/input/delete-pet.input';
import { Pet } from '@prisma/client';

@Injectable()
export class PetService {
  constructor(private readonly prismaService: PrismaService) {}
  async createPet(addPetInput: AddPetInput): Promise<boolean> {
    const result = await this.prismaService.pet.create({
      data: {
        ...addPetInput,
      },
    });
    if (!result) return false;
    return true;
  }

  async updatePet(updatePetInput: UpdatePetInput): Promise<boolean> {
    const { id, ...data } = updatePetInput;
    const result = await this.prismaService.pet.update({
      where: {
        id,
      },
      data: {
        ...data,
      },
    });

    if (!result) return false;
    return true;
  }

  async deletePet(
    deletePetInput: DeletePetInput,
    id_owner: string,
  ): Promise<boolean> {
    const { id, ...data } = deletePetInput;
    const result = await this.prismaService.pet.update({
      where: {
        id,
        id_owner,
      },
      data: {
        ...data,
      },
    });

    if (!result) return false;
    return true;
  }

  async findAllPet(): Promise<Pet[]> {
    return await this.prismaService.pet.findMany();
  }
}
