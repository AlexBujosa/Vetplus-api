import { Args, Context, Mutation, Resolver, Query } from '@nestjs/graphql';
import { UseGuards, UsePipes } from '@nestjs/common';
import { JwtAuthGuard } from '@/global/guard/jwt-auth.guard';
import { RolesGuard } from '@/global/guard/roles.guard';
import { Roles } from '@/global/decorator/roles.decorator';
import { Role } from '@prisma/client';
import { AppointmentService } from '@/appoinment/appointment.service';
import { AppointmentResponse } from '../types/appointment-response.type';
import { ScheduleAppointmentInput } from '../input/schedule-appointment.input';
import { Status } from '@/global/constant/constants';
import { AppointmentHistory } from '../types/appoinment-history.type';
import { FilterAppointmentByIdInput } from '../input/filter-appointment-by-pet.input';
import { UpdateAppointmentInput } from '../input/update-appointment.type';
import { FilterAppointmentByDateRangeInput } from '../input/filter-appointment-by-range-date.input';
import { Appointment } from '../types/appointment.type';
import { AppointmentVerified } from '../types/appointment-verified.type';
import { FilterAppointmentBySSInput } from '../input/filter-appointment-by-ss.input';
import { YupValidationPipe } from '@/global/pipe/yup-validation.pipe';
import { FilterAppointmentSSInputSchema } from '@/global/schema/filter-appointment-ss-input.schema';
import { UpdateAppointmentResumenInput } from '../input/update-appointment-resumen.input';

@Resolver()
export class AppointmentResolver {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Mutation(() => AppointmentResponse)
  @Roles(Role.ADMIN, Role.CLINIC_OWNER, Role.VETERINARIAN, Role.PET_OWNER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async scheduleAppoinment(
    @Args('scheduleAppointmentInput')
    scheduleAppoinmentInput: ScheduleAppointmentInput,
    @Context() context,
  ): Promise<AppointmentResponse> {
    const appoinmentCompleted =
      await this.appointmentService.scheduleAppointment(
        scheduleAppoinmentInput,
        context.req.user.sub,
      );
    return appoinmentCompleted
      ? { result: Status.COMPLETED }
      : { result: Status.FAILED };
  }

  @Query(() => [AppointmentHistory])
  @Roles(Role.CLINIC_OWNER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getAppointmentPerPetClinicOwners(
    @Args('filterAppointmentByIdInput')
    filterAppointmentByIdInput: FilterAppointmentByIdInput,
    @Context() context,
  ): Promise<AppointmentHistory[]> {
    const getAppointmentPerPet =
      await this.appointmentService.getAppointmentPerPetClinicOwner(
        filterAppointmentByIdInput,
        context.req.user.sub,
      );
    return getAppointmentPerPet;
  }

  @Query(() => [AppointmentHistory])
  @Roles(Role.ADMIN, Role.CLINIC_OWNER, Role.VETERINARIAN, Role.PET_OWNER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getAppointmentPerPet(
    @Args('filterAppointmentByIdInput')
    filterAppointmentByIdInput: FilterAppointmentByIdInput,
    @Context() context,
  ): Promise<AppointmentHistory[]> {
    const getAppointmentPerPet =
      await this.appointmentService.getAppointmentPerPetByAllRoles(
        filterAppointmentByIdInput,
        context.req.user.sub,
      );
    return getAppointmentPerPet;
  }

  @Query(() => [AppointmentHistory])
  @Roles(Role.CLINIC_OWNER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UsePipes(new YupValidationPipe(FilterAppointmentSSInputSchema))
  async getAppointmentDetailClinicOwner(
    @Args('filterAppointmentBySSInput')
    filterAppointmentBySSInput: FilterAppointmentBySSInput,
    @Context() context,
  ): Promise<AppointmentHistory[]> {
    const getAppointmentDetails =
      await this.appointmentService.getAppointmentDetailClinicOwner(
        filterAppointmentBySSInput,
        context.req.user.sub,
      );
    return getAppointmentDetails;
  }

  @Query(() => [AppointmentHistory])
  @Roles(Role.CLINIC_OWNER, Role.ADMIN, Role.VETERINARIAN, Role.PET_OWNER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UsePipes(new YupValidationPipe(FilterAppointmentSSInputSchema))
  async getAppointmentDetailAllRoles(
    @Args('filterAppointmentBySSInput')
    filterAppointmentBySSInput: FilterAppointmentBySSInput,
    @Context() context,
  ): Promise<AppointmentHistory[]> {
    const getAppointmentDetails =
      await this.appointmentService.getAppointmentDetailByAllRoles(
        filterAppointmentBySSInput,
        context.req.user.sub,
      );
    return getAppointmentDetails;
  }

  @Mutation(() => AppointmentResponse)
  @Roles(Role.CLINIC_OWNER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async respondToAppointment(
    @Args('updateAppointmentInput')
    updateAppointmentInput: UpdateAppointmentInput,
    @Context() context,
  ): Promise<AppointmentResponse> {
    const updateAppointment =
      await this.appointmentService.updateAppointmentDetail(
        updateAppointmentInput,
        context.req.user.sub,
      );
    return updateAppointment
      ? { result: Status.COMPLETED }
      : { result: Status.FAILED };
  }

  @Mutation(() => AppointmentResponse)
  @Roles(Role.VETERINARIAN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updateAppointmentResumen(
    @Args('updateAppointmentResumenInput')
    updateAppointmentResumenInput: UpdateAppointmentResumenInput,
  ): Promise<AppointmentResponse> {
    await this.appointmentService.updateAppointmentResumen(
      updateAppointmentResumenInput,
    );
    return { result: Status.COMPLETED };
  }

  @Query(() => [Appointment])
  @Roles(Role.CLINIC_OWNER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getAppointmentPerRangeDateTime(
    @Args('filterAppointmentByDateRangeInput')
    filterAppointmentByDateRangeInput: FilterAppointmentByDateRangeInput,
    @Context() context,
  ): Promise<Appointment[]> {
    const getAppointmentFilter =
      await this.appointmentService.filterAppointmentDateRange(
        filterAppointmentByDateRangeInput,
        context.req.user.sub,
      );
    return getAppointmentFilter;
  }

  @Query(() => [AppointmentVerified])
  @Roles(Role.CLINIC_OWNER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getAppointmentsVerified(
    @Args('filterAppointmentByDateRangeInput')
    filterAppointmentByDateRangeInput: FilterAppointmentByDateRangeInput,
    @Context() context,
  ): Promise<Appointment[]> {
    const getAppointmentsVerified =
      await this.appointmentService.getAppointmentsVerified(
        filterAppointmentByDateRangeInput,
        context.req.user.sub,
      );
    return getAppointmentsVerified;
  }
}
