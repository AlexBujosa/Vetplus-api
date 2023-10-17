import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { ScheduleAppointmentInput } from './graphql/input/schedule-appointment.input';
import { ServicesResult } from './constant';
import { AppointmentHistory } from './graphql/types/appoinment-history.type';
import { FilterAppointmentByIdInput } from './graphql/input/filter-appointment-by-pet.input';
import { UpdateAppointmentInput } from './graphql/input/update-appointment.type';
import { FilterAppointmentByDateRangeInput } from './graphql/input/filter-appointment-by-range-date.input';
import { Appointment } from './graphql/types/appointment.type';
import { AppointmentVerified } from './graphql/types/appointment-verified.type';

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

  async getAppointmentPerPet(
    filterAppointmentByIdInput: FilterAppointmentByIdInput,
  ): Promise<AppointmentHistory[]> {
    const { id: id_pet, state } = filterAppointmentByIdInput;

    const result = state ? { state } : {};
    const getAllAppointment = await this.prismaService.appointment.findMany({
      where: {
        id_pet,
        ...result,
      },
      include: {
        Pet: true,
        Clinic: true,
        Veterinarian: true,
      },
    });

    const getAllAppoinmentResult = this.getAllApointment(getAllAppointment);

    return getAllAppoinmentResult;
  }

  async getAppointmentDetail(
    filterAppointmentByIdInput: FilterAppointmentByIdInput,
    id_owner: string,
  ): Promise<AppointmentHistory[]> {
    const { id: id_clinic, state } = filterAppointmentByIdInput;
    const result = state ? { state } : {};
    const getAllAppointment = await this.prismaService.appointment.findMany({
      where: {
        id_clinic,
        ...result,
        Clinic: {
          id_owner,
        },
      },
      include: {
        Pet: true,
        Clinic: true,
        Veterinarian: true,
      },
    });

    const getAllAppoinmentResult = this.getAllApointment(getAllAppointment);

    return getAllAppoinmentResult;
  }

  async updateAppointmentDetail(
    updateAppointmentInput: UpdateAppointmentInput,
    id_owner: string,
  ) {
    const { id, id_clinic, appointment_status, end_at } =
      updateAppointmentInput;

    const appointmentUpdated = await this.prismaService.appointment.update({
      data: {
        appointment_status,
        end_at,
      },
      where: {
        id,
        id_clinic,
        Clinic: {
          id_owner,
        },
      },
    });

    return appointmentUpdated ? true : false;
  }

  async filterAppointmentDateRange(
    filterAppointmentByDateRangeInput: FilterAppointmentByDateRangeInput,
    id_owner: string,
  ): Promise<Appointment[]> {
    const {
      start_at,
      end_at,
      id: id_clinic,
    } = filterAppointmentByDateRangeInput;

    const getAppointmentsByDateRange: Appointment[] =
      await this.prismaService.appointment.findMany({
        where: {
          id_clinic,
          Clinic: {
            id_owner,
          },
          appointment_status: 'ACCEPTED',
          AND: [{ start_at: { gte: start_at } }, { end_at: { lte: end_at } }],
        },
      });

    const getAppointmentsByDateRangeResult = this.getAllApointment(
      getAppointmentsByDateRange,
    );

    return getAppointmentsByDateRangeResult;
  }

  async getAppointmentsVerified(
    filterAppointmentByDateRangeInput: FilterAppointmentByDateRangeInput,
    id_owner: string,
  ): Promise<AppointmentVerified[]> {
    const {
      id: id_clinic,
      start_at,
      end_at,
    } = filterAppointmentByDateRangeInput;
    const getAppointmentsVerified: AppointmentVerified[] =
      await this.prismaService.appointment.findMany({
        where: {
          id_clinic,
          Clinic: {
            id_owner,
          },
          OR: [
            { appointment_status: 'ACCEPTED' },
            { appointment_status: 'DENIED' },
          ],
          AND: [{ start_at: { gte: start_at } }, { end_at: { lte: end_at } }],
        },
        include: {
          Owner: true,
        },
      });

    const getAppointmentsByDateRangeResult = this.getAllApointment(
      getAppointmentsVerified,
    );

    return getAppointmentsByDateRangeResult;
  }

  private getAllApointment(getAllApointment: any[]) {
    const getAllAppoinmentResult = getAllApointment.map((row) => {
      const { services, ...rest } = row;
      const servicesResult = this.getServicesAsStringOrStringArray(services);
      return {
        ...rest,
        services: servicesResult,
      };
    });
    return getAllAppoinmentResult;
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
