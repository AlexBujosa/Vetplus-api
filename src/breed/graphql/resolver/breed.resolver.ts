import { Args, Context, Mutation, Resolver, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@/global/guard/jwt-auth.guard';
import { RolesGuard } from '@/global/guard/roles.guard';
import { Roles } from '@/global/decorator/roles.decorator';
import { Role } from '@prisma/client';
import { AddBreedInput } from '../input/add-breed.input';
import { BreedService } from '@/breed/breed.service';
import { BreedResult } from '@/breed/constant/contant';
import { AddBreedResponse } from '../types/add-specie-response.type';

@Resolver()
@Roles(Role.ADMIN)
export class BreedResolver {
  constructor(private readonly breedService: BreedService) {}

  @Mutation(() => AddBreedResponse)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async registerBreed(
    @Args('addBreedInput') addBreedInput: AddBreedInput,
  ): Promise<AddBreedResponse> {
    const result = await this.breedService.createBreed(addBreedInput);

    return !result
      ? { result: BreedResult.FAILED }
      : { result: BreedResult.COMPLETED };
  }
}
