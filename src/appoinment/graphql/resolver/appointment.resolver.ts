import { Args, Context, Mutation, Resolver, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@/global/guard/jwt-auth.guard';
import { RolesGuard } from '@/global/guard/roles.guard';
import { Roles } from '@/global/decorator/roles.decorator';
import { Role } from '@prisma/client';
import { AppointmentService } from '@/appoinment/appointment.service';
import { AppointmentResponse } from '../types/appointment-response.type';
import { ScheduleAppointmentInput } from '../input/schedule-appointment.input';
import { Status } from '@/global/constant/constants';
import { Appointment } from '../types/appointment.type';
import { GenericByIdInput } from '@/global/graphql/input/generic-by-id.input';

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

  @Query(() => [Appointment])
  @Roles(Role.ADMIN, Role.CLINIC_OWNER, Role.VETERINARIAN, Role.PET_OWNER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getAppoinmentCompletedPerPet(
    @Args('genericByIdInput')
    genericByIdInput: GenericByIdInput,
  ): Promise<Appointment[]> {
    const getAppointmentCompleted =
      await this.appointmentService.getAppointmentCompletedPerPet(
        genericByIdInput,
      );
    return getAppointmentCompleted;
  }
}
