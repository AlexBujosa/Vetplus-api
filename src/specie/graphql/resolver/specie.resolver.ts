import { Args, Context, Mutation, Resolver, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@/global/guard/jwt-auth.guard';
import { RolesGuard } from '@/global/guard/roles.guard';
import { Roles } from '@/global/decorator/roles.decorator';
import { Role } from '@prisma/client';
import { SpecieService } from '@/specie/specie.service';
import { AddSpecieInput } from '../input/add-specie.input';
import { SpecieResult } from '@/specie/constant/contant';
import { AddSpecieResponse } from '../types/add-specie-response.type';

@Resolver()
@Roles(Role.ADMIN)
export class SpecieResolver {
  constructor(private readonly specieService: SpecieService) {}

  @Mutation(() => AddSpecieResponse)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async registerSpecie(
    @Args('addPetInput') addSpecieInput: AddSpecieInput,
  ): Promise<AddSpecieResponse> {
    const result = await this.specieService.createSpecie(addSpecieInput);

    return !result
      ? { result: SpecieResult.FAILED }
      : { result: SpecieResult.COMPLETED };
  }
}
