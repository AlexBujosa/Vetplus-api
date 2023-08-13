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
import { AwsS3Service } from '@/aws_s3/aws_s3.service';

@Resolver()
export class PetResolver {
  constructor(
    private readonly petService: PetService,
    private readonly awsS3Service: AwsS3Service,
  ) {}

  @Mutation(() => AddPetResponse)
  @Roles(Role.CLINIC_OWNER, Role.PET_OWNER, Role.VETERINARIAN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async registerPet(
    @Args('addPetInput') addPetInput: AddPetInput,
    @Context() context,
  ): Promise<AddPetResponse> {
    const { image, ...rest } = addPetInput;

    const s3Location = await this.awsS3Service.savePetImageToS3(image);

    const result = await this.petService.createPet(
      {
        ...rest,
        image: s3Location,
      },
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
