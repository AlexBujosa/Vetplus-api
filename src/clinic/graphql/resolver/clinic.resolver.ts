import { Args, Context, Mutation, Resolver, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@/global/guard/jwt-auth.guard';
import { RolesGuard } from '@/global/guard/roles.guard';
import { Roles } from '@/global/decorator/roles.decorator';
import { Role } from '@prisma/client';
import { AddClinicInput } from '../input/add-clinic.input';
import { Clinic } from '../types/clinic.type';
import { ClinicService } from '@/clinic/clinic.service';
import { ClinicResult } from '@/clinic/constant';
import { AddClinicResponse } from '../types/add-clinic-response.type';
import { GetClinicByIdInput } from '../input/get-clinic-by-id.input';
import { GetAllServicesByIdInput } from '../input/get-all-services-by-id.input';
import { ClinicServiceResult } from '../types/clinic-service-result.type';

@Resolver()
export class ClinicResolver {
  constructor(private readonly clinicService: ClinicService) {}

  @Mutation(() => AddClinicResponse)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.CLINIC_OWNER)
  async registerClinic(
    @Args('addClinicInput') addClinicInput: AddClinicInput,
    @Context() context,
  ): Promise<AddClinicResponse> {
    const result = await this.clinicService.createClinic(
      addClinicInput,
      context.req.user.sub,
    );

    return !result
      ? { result: ClinicResult.FAILED }
      : { result: ClinicResult.COMPLETED };
  }

  @Query(() => [Clinic])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.CLINIC_OWNER, Role.CLINIC_OWNER, Role.VETERINARIAN)
  async getAllClinic(): Promise<Clinic[]> {
    return await this.clinicService.getAllClinic();
  }

  @Query(() => Clinic)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.CLINIC_OWNER, Role.CLINIC_OWNER, Role.VETERINARIAN)
  async getClinicById(
    @Args('getClinicByIdInput') getClinicByIdInput: GetClinicByIdInput,
  ): Promise<Clinic> {
    const { id } = getClinicByIdInput;
    return await this.clinicService.getClinicById(id);
  }

  @Query(() => [ClinicServiceResult])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.CLINIC_OWNER, Role.CLINIC_OWNER, Role.VETERINARIAN)
  async getAllClinicServices(
    @Args('getAllServicesById')
    getAllServicesByIdInput: GetAllServicesByIdInput,
  ): Promise<ClinicServiceResult[]> {
    const { id } = getAllServicesByIdInput;
    return await this.clinicService.getAllServicesById(id);
  }
}
