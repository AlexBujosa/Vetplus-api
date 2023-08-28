import { AddPetInput } from '@/pet/graphql/input/add-pet.input';
import { Args, Context, Mutation, Resolver, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { PetService } from '@/pet/pet.service';
import { AddPetResponse } from '../types/add-pet-response.type';
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
import { SavePetImageInput } from '../input/save-pet-image.input';
import { SavePetImageResponse } from '../types/save-pet-image-response.type';
import { DeletePetImageInput } from '../input/delete-pet-image.input';
import { DeletePetImageResponse } from '../types/delete-pet-image-response.type';
import { Status } from '@/global/constant/constants';

@Resolver()
export class PetResolver {
  constructor(
    private readonly petService: PetService,
    private readonly awsS3Service: AwsS3Service,
  ) {}

  @Query(() => [Pet])
  @Roles(Role.PET_OWNER, Role.VETERINARIAN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getMyPets(@Context() context): Promise<Pet[]> {
    const result = await this.petService.getMyPets(context.req.user.sub);
    return result;
  }

  @Mutation(() => DeletePetImageResponse)
  @Roles(Role.CLINIC_OWNER, Role.PET_OWNER, Role.VETERINARIAN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async deletePetImage(
    @Args('deletePetImageInput') deletePetImageInput: DeletePetImageInput,
  ): Promise<DeletePetImageResponse> {
    const { image } = deletePetImageInput;

    const result = await this.awsS3Service.deleteImageToS3(image, 'pets');

    return !result ? { result: Status.FAILED } : { result: Status.COMPLETED };
  }

  @Mutation(() => SavePetImageResponse)
  @Roles(Role.CLINIC_OWNER, Role.PET_OWNER, Role.VETERINARIAN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async savePetImage(
    @Args('savePetImageInput') savePetImageInput: SavePetImageInput,
  ): Promise<SavePetImageResponse> {
    const { image } = savePetImageInput;

    if (image) this.awsS3Service.validateImages(await image);
    const s3Location = image
      ? await this.awsS3Service.saveImageToS3(await image, 'pets')
      : null;

    return !s3Location
      ? { result: Status.FAILED, image: s3Location }
      : { result: Status.COMPLETED, image: s3Location };
  }

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

    return !result ? { result: Status.FAILED } : { result: Status.COMPLETED };
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
    const { url_current_image, url_new_image } = updatePetInput;

    if (url_new_image && url_current_image && result)
      await this.awsS3Service.deleteImageToS3(url_current_image, 'pets');

    return !result ? { result: Status.FAILED } : { result: Status.COMPLETED };
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

    return !result ? { result: Status.FAILED } : { result: Status.COMPLETED };
  }

  @Query(() => [Pet])
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findAllPet(): Promise<Pet[]> {
    return await this.petService.findAllPet();
  }
}
