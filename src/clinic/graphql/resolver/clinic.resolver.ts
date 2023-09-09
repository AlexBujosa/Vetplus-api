import { Args, Context, Mutation, Resolver, Query } from '@nestjs/graphql';
import { UseGuards, UsePipes } from '@nestjs/common';
import { JwtAuthGuard } from '@/global/guard/jwt-auth.guard';
import { RolesGuard } from '@/global/guard/roles.guard';
import { Roles } from '@/global/decorator/roles.decorator';
import { Role } from '@prisma/client';
import { AddClinicInput } from '../input/add-clinic.input';
import { Clinic } from '../types/clinic.type';
import { ClinicService } from '@/clinic/clinic.service';
import { ClinicResult } from '@/clinic/constant';
import { ClinicResponse } from '../types/add-clinic-response.type';
import { GetClinicByIdInput } from '../input/get-clinic-by-id.input';
import { GetAllServicesByIdInput } from '../input/get-all-services-by-id.input';
import { ClinicServiceResult } from '../types/clinic-service-result.type';
import { ClinicEmployeeResult } from '../types/clinic-employee-result.type';
import { GetAllEmployeeByIdInput } from '../input/get-all-employee-by-id.input';
import { MarkAsFavoriteClinicInput } from '../input/mark-as-favorite-clinic.input';
import { FavoriteClinicResult } from '../types/favorite-clinic-result.type';
import { ScoreClinicInput } from '../input/score-clinic.input';
import { ScoreClinicResponse } from '../types/score-clinic-response.type';
import { YupValidationPipe } from '@/global/pipe/yup-validation.pipe';
import { AddClinicInputSchema } from '@/global/schema/add-clinic-input.schema';
import { ScoreClinicInputSchema } from '@/global/schema/score-clinic-input.schema';
import { TurnEmployeeStatusInput } from '../input/turn-employee-status.input';

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

    return !result
      ? { result: ClinicResult.FAILED }
      : { result: ClinicResult.COMPLETED };
  }

  @Mutation(() => ClinicResponse)
  @Roles(Role.ADMIN, Role.CLINIC_OWNER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UsePipes(new YupValidationPipe(AddClinicInputSchema))
  async changeEmployeeStatus(
    @Args('turnEmployeeStatusInput')
    turnEmployeeStatusInput: TurnEmployeeStatusInput,
  ): Promise<ClinicResponse> {
    const result = await this.clinicService.turnEmployeeStatus(
      turnEmployeeStatusInput,
    );

    return !result
      ? { result: ClinicResult.FAILED }
      : { result: ClinicResult.COMPLETED };
  }

  @Query(() => [Clinic])
  @Roles(Role.ADMIN, Role.CLINIC_OWNER, Role.PET_OWNER, Role.VETERINARIAN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getAllClinic(): Promise<Clinic[]> {
    return await this.clinicService.getAllClinic();
  }

  @Query(() => Clinic)
  @Roles(Role.ADMIN, Role.CLINIC_OWNER, Role.PET_OWNER, Role.VETERINARIAN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getClinicById(
    @Args('getClinicByIdInput') getClinicByIdInput: GetClinicByIdInput,
  ): Promise<Clinic> {
    const { id } = getClinicByIdInput;
    return await this.clinicService.getClinicById(id);
  }

  @Query(() => [ClinicServiceResult])
  @Roles(Role.ADMIN, Role.CLINIC_OWNER, Role.PET_OWNER, Role.VETERINARIAN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getAllClinicServices(
    @Args('getAllServicesByIdInput')
    getAllServicesByIdInput: GetAllServicesByIdInput,
  ): Promise<ClinicServiceResult[]> {
    const { id } = getAllServicesByIdInput;
    return await this.clinicService.getAllServicesById(id);
  }

  @Query(() => [ClinicEmployeeResult])
  @Roles(Role.ADMIN, Role.CLINIC_OWNER, Role.PET_OWNER, Role.VETERINARIAN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getAllEmployee(
    @Args('getAllEmployeeByIdInput')
    getAllEmployeeByIdInput: GetAllEmployeeByIdInput,
  ): Promise<ClinicEmployeeResult[]> {
    const { id } = getAllEmployeeByIdInput;
    return await this.clinicService.getAllEmployeeById(id);
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

    return result
      ? { result: ClinicResult.COMPLETED }
      : { result: ClinicResult.FAILED };
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
    return result
      ? { result: ClinicResult.COMPLETED }
      : { result: ClinicResult.FAILED };
  }
}
