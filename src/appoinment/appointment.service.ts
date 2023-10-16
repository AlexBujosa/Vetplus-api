import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { ScheduleAppointmentInput } from './graphql/input/schedule-appointment.input';
import { GenericByIdInput } from '@/global/graphql/input/generic-by-id.input';
import { ServicesResult } from './constant';
import { Appointment } from './graphql/types/appointment.type';

@Injectable()
export class AppointmentService {
  constructor(private readonly prismaService: PrismaService) {}

  async scheduleAppointment(
    scheduleAppointmentInput: ScheduleAppointmentInput,
    id_owner: string,
  ): Promise<boolean> {
    const { services, ...rest } = scheduleAppointmentInput;

    const serviceResult =
      typeof services == 'string'
        ? services
        : JSON.stringify({ services: services });

    const appoinmentCreated = await this.prismaService.appointment.create({
      data: {
        ...rest,
        services: serviceResult,
        id_owner,
      },
    });

    return appoinmentCreated ? true : false;
  }

  async getAppointmentCompletedPerPet(
    genericByIdInput: GenericByIdInput,
  ): Promise<Appointment[]> {
    const { id: id_pet } = genericByIdInput;
    const getAllAppointmentCompleted =
      await this.prismaService.appointment.findMany({
        where: {
          id_pet,
          state: 'FINISHED',
        },
      });

    const getAllAppoinmentCompletedResult = getAllAppointmentCompleted.map(
      (row) => {
        const { services, ...rest } = row;
        const servicesResult = this.getServicesAsStringOrStringArray(services);
        return {
          ...rest,
          services: servicesResult,
        };
      },
    );

    return getAllAppoinmentCompletedResult;
  }

  private getServicesAsStringOrStringArray(
    servicesStr: string,
  ): string | string[] {
    try {
      const services: ServicesResult = JSON.parse(servicesStr);
      const { services: serviceArray } = services;
      return serviceArray;
    } catch (ex) {
      return servicesStr;
    }
  }
}
