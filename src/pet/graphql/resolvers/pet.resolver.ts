import { Args, Context, Mutation, Resolver, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { PetService } from '@/pet/pet.service';
import { AddPetInput } from '../input/add-pet.input';
import { AddPetResponse } from '../types/add-pet-response.type';
import { AddPetResult } from '../constant/constants';
import { JwtAuthGuard } from '@/global/guard/jwt-auth.guard';
import { RolesGuard } from '@/global/guard/roles.guard';
import { Roles } from '@/global/decorator/roles.decorator';
import { Role } from '@prisma/client';
import { UpdatePetInput } from '../input/update-pet.input';
import { UpdatePetResponse } from '../types/update-pet-response.type';
import { DeletePetInput } from '../input/delete-pet.input';
import { DeletePetResponse } from '../types/delete-pet-response,type';
import { Pet } from '../types/pet.type';

@Resolver()
export class PetResolver {
  constructor(private readonly petService: PetService) {}

  @Mutation(() => AddPetResponse)
  @Roles(Role.CLINIC_OWNER, Role.PET_OWNER, Role.VETERINARIAN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async registerPet(
    @Args('addPetInput') addPetInput: AddPetInput,
    @Context() context,
  ): Promise<AddPetResponse> {
    const result = await this.petService.createPet(
      addPetInput,
      context.req.user.sub,
    );

    if (!result)
      return {
        result: AddPetResult.FAILED,
      };

    return {
      result: AddPetResult.COMPLETED,
    };
  }

  @Mutation(() => UpdatePetResponse)
  @Roles(Role.CLINIC_OWNER, Role.PET_OWNER, Role.VETERINARIAN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updatePet(
    @Args('updatePetInput') updatePetInput: UpdatePetInput,
    @Context() context,
  ): Promise<UpdatePetResponse> {
    const result = await this.petService.updatePet(
      updatePetInput,
      context.req.user.sub,
    );

    if (!result)
      return {
        result: AddPetResult.FAILED,
      };

    return {
      result: AddPetResult.COMPLETED,
    };
  }

  @Mutation(() => DeletePetResponse)
  @Roles(Role.PET_OWNER, Role.VETERINARIAN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async deletePet(
    @Args('deletePetInput') deletePetInput: DeletePetInput,
    @Context() context,
  ): Promise<DeletePetResponse> {
    const result = await this.petService.deletePet(
      deletePetInput,
      context.req.user.sub,
    );

    if (!result)
      return {
        result: AddPetResult.FAILED,
      };

    return {
      result: AddPetResult.COMPLETED,
    };
  }

  @Query(() => [Pet])
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findAllPet(): Promise<Pet[]> {
    return await this.petService.findAllPet();
  }
}
