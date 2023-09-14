import { Args, Context, Mutation, Resolver, Query } from '@nestjs/graphql';
import { UseGuards, UsePipes } from '@nestjs/common';
import { JwtAuthGuard } from '@/global/guard/jwt-auth.guard';
import { RolesGuard } from '@/global/guard/roles.guard';
import { Roles } from '@/global/decorator/roles.decorator';
import { Role } from '@prisma/client';
import { AddClinicInput } from '../input/add-clinic.input';
import { Clinic } from '../types/clinic.type';
import { ClinicService } from '@/clinic/clinic.service';
import { ClinicResponse } from '../types/clinic-response.type';
import { ClinicServiceResult } from '../types/clinic-service-result.type';
import { MarkAsFavoriteClinicInput } from '../input/mark-as-favorite-clinic.input';
import { FavoriteClinicResult } from '../types/favorite-clinic-result.type';
import { ScoreClinicInput } from '../input/score-clinic.input';
import { ScoreClinicResponse } from '../types/score-clinic-response.type';
import { YupValidationPipe } from '@/global/pipe/yup-validation.pipe';
import { AddClinicInputSchema } from '@/global/schema/add-clinic-input.schema';
import { ScoreClinicInputSchema } from '@/global/schema/score-clinic-input.schema';
import { GenericByIdInput } from '@/global/graphql/input/generic-by-id.input';
import { Status } from '@/global/constant/constants';
import { GetAllClinic } from '../types/get-all-clinic.type';
import { GetAllClientsResult } from '../types/get-all-clients-result.type';
import { UpdateClinicInput } from '../input/update-clinic.input';
import { ClinicServiceArray } from '../types/clinic-services-array.type';

@Resolver()
export class ClinicResolver {
  constructor(private readonly clinicService: ClinicService) {}

  @Mutation(() => ClinicResponse)
  @Roles(Role.ADMIN, Role.CLINIC_OWNER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UsePipes(new YupValidationPipe(AddClinicInputSchema))
  async registerClinic(
    @Args('addClinicInput') addClinicInput: AddClinicInput,
    @Context() context,
  ): Promise<ClinicResponse> {
    const result = await this.clinicService.createClinic(
      addClinicInput,
      context.req.user.sub,
    );

    return !result ? { result: Status.FAILED } : { result: Status.COMPLETED };
  }

  @Mutation(() => ClinicResponse)
  @Roles(Role.ADMIN, Role.CLINIC_OWNER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UsePipes(new YupValidationPipe(AddClinicInputSchema))
  async updateClinic(
    @Args('updateClinicInput') updateClinicInput: UpdateClinicInput,
  ): Promise<ClinicResponse> {
    const result = await this.clinicService.updateClinic(updateClinicInput);

    return !result ? { result: Status.FAILED } : { result: Status.COMPLETED };
  }

  @Query(() => ClinicServiceArray)
  @Roles(Role.ADMIN, Role.CLINIC_OWNER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getMyClinic(@Context() context): Promise<ClinicServiceArray> {
    const result = await this.clinicService.getMyClinic(context.req.user.sub);

    return result;
  }

  @Query(() => [GetAllClinic])
  @Roles(Role.ADMIN, Role.CLINIC_OWNER, Role.PET_OWNER, Role.VETERINARIAN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getAllClinic(): Promise<GetAllClinic[]> {
    return await this.clinicService.getAllClinic();
  }

  @Query(() => ClinicServiceArray)
  @Roles(Role.ADMIN, Role.CLINIC_OWNER, Role.PET_OWNER, Role.VETERINARIAN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getClinicById(
    @Args('getClinicByIdInput') getClinicByIdInput: GenericByIdInput,
  ): Promise<ClinicServiceArray> {
    const { id } = getClinicByIdInput;
    return await this.clinicService.getClinicById(id);
  }

  @Query(() => ClinicServiceResult)
  @Roles(Role.ADMIN, Role.CLINIC_OWNER, Role.PET_OWNER, Role.VETERINARIAN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getAllClinicServices(
    @Args('genericByIdInput')
    genericByIdInput: GenericByIdInput,
  ): Promise<ClinicServiceResult> {
    const { id } = genericByIdInput;
    return await this.clinicService.getAllServicesById(id);
  }

  @Mutation(() => [ClinicResponse])
  @Roles(Role.ADMIN, Role.CLINIC_OWNER, Role.VETERINARIAN, Role.PET_OWNER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async markAsFavoriteClinic(
    @Args('markAsFavoriteClinicInput')
    markAsFavoriteClinicInput: MarkAsFavoriteClinicInput,
    @Context() context,
  ): Promise<ClinicResponse> {
    const result = await this.clinicService.markAsFavoriteClinic(
      markAsFavoriteClinicInput,
      context.req.user.sub,
    );

    return result ? { result: Status.COMPLETED } : { result: Status.FAILED };
  }

  @Query(() => [FavoriteClinicResult])
  @Roles(Role.ADMIN, Role.CLINIC_OWNER, Role.VETERINARIAN, Role.PET_OWNER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getAllFavoriteClinic(
    @Context() context,
  ): Promise<FavoriteClinicResult[]> {
    return await this.clinicService.getAllFavoriteById(context.req.user.sub);
  }

  @Mutation(() => ScoreClinicResponse)
  @Roles(Role.ADMIN, Role.CLINIC_OWNER, Role.VETERINARIAN, Role.PET_OWNER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UsePipes(new YupValidationPipe(ScoreClinicInputSchema))
  async scoreClinic(
    @Args('scoreClinicInput') scoreClinicInput: ScoreClinicInput,
    @Context() context,
  ): Promise<ScoreClinicResponse> {
    const result = await this.clinicService.scoreClinic(
      scoreClinicInput,
      context.req.user.sub,
    );
    return result ? { result: Status.COMPLETED } : { result: Status.FAILED };
  }

  @Query(() => [GetAllClientsResult])
  @Roles(Role.ADMIN, Role.CLINIC_OWNER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UsePipes(new YupValidationPipe(ScoreClinicInputSchema))
  async getAllClients(@Context() context): Promise<GetAllClientsResult[]> {
    const result = await this.clinicService.GetAllClients(context.req.user.sub);
    return result;
  }
}
