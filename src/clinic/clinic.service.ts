import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { AddClinicInput } from './graphql/input/add-clinic.input';
import { ClinicType, FavoriteClinic, ServiceResult } from './constant';
import { MarkAsFavoriteClinicInput } from './graphql/input/mark-as-favorite-clinic.input';
import { ScoreClinicInput } from './graphql/input/score-clinic.input';
import { SummaryScore, customException } from '@/global/constant/constants';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { OmitTx } from '@/Employee/constant';
import { GetAllClinic } from './graphql/types/get-all-clinic.type';
import { GenericByIdInput } from '@/global/graphql/input/generic-by-id.input';
import { GetAllClientsResult } from './graphql/types/get-all-clients-result.type';
import { UpdateClinicInput } from './graphql/input/update-clinic.input';
import { GetClinicResult } from './graphql/types/get-clinic-result.type';
import { Schedule } from './graphql/types/schedule.type';
import { Prisma } from '@prisma/client';
import { plainToInstance } from 'class-transformer';
import { TurnClinicStatusInput } from './graphql/input/turn-clinic-status.input';

@Injectable()
export class ClinicService {
  constructor(private readonly prismaService: PrismaService) {}
  async createClinic(
    addClinicInput: AddClinicInput,
    id_owner: string,
  ): Promise<boolean> {
    try {
      const result = await this.prismaService.$transaction(
        async (tx: OmitTx) => {
          const createClinic = await tx.clinic.create({
            data: {
              ...addClinicInput,
              id_owner,
            },
          });

          if (!createClinic) return false;

          const score = await tx.clinic_Summary_Score.create({
            data: {
              id_clinic: createClinic.id,
            },
          });

          if (!score) throw Error('Did not create clinic score');
          return true;
        },
      );

      if (!result) return false;
      return true;
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code == 'P2002'
      ) {
        throw customException.ALREADY_HAVE_CLINIC(null);
      } else {
        throw customException.CREATION_CLINIC_FAILED(error.message);
      }
    }
  }

  async updateClinic(UpdateClinicInput: UpdateClinicInput, id_owner: string) {
    const { services, ...rest } = UpdateClinicInput;
    const result = await this.prismaService.clinic.update({
      data: {
        ...rest,
        services: services ? JSON.stringify({ services: services }) : null,
      },
      where: {
        id_owner,
      },
    });
    return result ? true : false;
  }

  async getClinicById(id: string): Promise<GetClinicResult> {
    const { services, schedule, ...rest } =
      await this.prismaService.clinic.findFirst({
        include: {
          clinicSummaryScore: {
            select: {
              total_points: true,
              total_users: true,
            },
          },
        },
        where: {
          id,
        },
      });

    const scheduleResult: Schedule = this.convertJsonObjectToScheduleType(
      schedule as Prisma.JsonObject,
    );

    const clinicServices = this.getClinicServicesAsArray(services);
    const result = this.addServiceResultToGetClinicResult(clinicServices, rest);
    result.schedule = scheduleResult;

    return result;
  }

  async getMyClinic(id_owner: string): Promise<GetClinicResult> {
    const { services, schedule, ...rest } =
      await this.prismaService.clinic.findUnique({
        include: {
          clinicSummaryScore: {
            select: {
              total_points: true,
              total_users: true,
            },
          },
        },
        where: {
          id_owner,
        },
      });

    const scheduleResult: Schedule = this.convertJsonObjectToScheduleType(
      schedule as Prisma.JsonObject,
    );

    const clinicServices = this.getClinicServicesAsArray(services);
    const result = this.addServiceResultToGetClinicResult(clinicServices, rest);
    result.schedule = scheduleResult;

    return result;
  }

  async getAllClinic(): Promise<GetAllClinic[]> {
    const result = await this.prismaService.clinic.findMany({
      where: {
        status: true,
      },
      include: {
        clinicSummaryScore: true,
      },
    });

    return result;
  }

  async changeMyClinicStatus(
    turnClinicStatusInput: TurnClinicStatusInput,
    id_owner: string,
  ): Promise<boolean> {
    const { status } = turnClinicStatusInput;
    const result = await this.prismaService.clinic.update({
      data: {
        status,
      },
      where: {
        id_owner,
      },
    });

    return result ? true : false;
  }

  private convertJsonObjectToScheduleType(schedule: Prisma.JsonObject) {
    const result = plainToInstance(Schedule, schedule);
    return result;
  }

  async getAllServicesById(id_clinic: string): Promise<ServiceResult> {
    const clinic = await this.prismaService.clinic.findFirst({
      select: {
        services: true,
      },
      where: {
        id: id_clinic,
      },
    });

    if (!clinic.services) return null;

    return this.getClinicServicesAsArray(clinic.services);
  }

  private addServiceResultToGetClinicResult(
    serviceResult: ServiceResult,
    clinic: ClinicType,
  ): GetClinicResult {
    const getMyClinic: GetClinicResult = {
      ...clinic,
      services: serviceResult?.services,
      schedule: null,
    };
    return getMyClinic;
  }

  private getClinicServicesAsArray(servicesStr: string): ServiceResult {
    if (!servicesStr) return null;
    const clinic_service: ServiceResult = JSON.parse(servicesStr);
    return clinic_service;
  }

  async getAllFavoriteById(id_user: string): Promise<FavoriteClinic[]> {
    const result = await this.prismaService.clinic_User.findMany({
      where: {
        id_user,
        favorite: true,
      },
      include: {
        clinic: {
          select: {
            name: true,
            address: true,
          },
        },
      },
    });
    return result;
  }

  async markAsFavoriteClinic(
    markAsFavortiClinicInput: MarkAsFavoriteClinicInput,
    id_user: string,
  ): Promise<boolean> {
    const { id, favorite } = markAsFavortiClinicInput;
    const result = await this.prismaService.clinic_User.upsert({
      where: {
        id_user_id_clinic: { id_user, id_clinic: id },
      },
      update: {
        favorite,
      },
      create: {
        favorite,
        id_user,
        id_clinic: id,
      },
    });

    return result ? true : false;
  }

  async scoreClinic(
    scoreClinicInput: ScoreClinicInput,
    id_user: string,
  ): Promise<boolean> {
    const { id_clinic } = scoreClinicInput;
    const result = await this.upsertScoreClinic(scoreClinicInput, id_user);

    const total_score_clinic = await this.getTotalScoreClinic(id_clinic);

    await this.upsertSummaryScoreClinic(total_score_clinic, id_clinic);

    return result;
  }

  async getTotalScoreClinic(id_clinic: string) {
    const result = await this.prismaService.clinic_User.groupBy({
      by: 'id_clinic',
      _sum: {
        points: true,
      },
      _count: true,
      where: {
        id_clinic,
        points: {
          not: {
            equals: null,
          },
        },
      },
    });
    return result[0];
  }
  async GetAllClients(
    genericByIdInput: GenericByIdInput,
  ): Promise<GetAllClientsResult[]> {
    const { id } = genericByIdInput;
    const result = await this.prismaService.clinic_User.findMany({
      where: {
        id_user: id,
        clientAttendance: true,
      },
      include: {
        user: {
          include: {
            Pet: {
              include: {
                breed: true,
              },
            },
            AppointmentOwner: {
              select: {
                start_at: true,
                end_at: true,
              },
              orderBy: {
                start_at: 'desc',
              },
              take: 1,
            },
          },
        },
      },
    });
    return result;
  }

  private async upsertScoreClinic(
    scoreClinicInput: ScoreClinicInput,
    id_user: string,
  ): Promise<boolean> {
    const { id_clinic, score } = scoreClinicInput;
    const result = await this.prismaService.clinic_User.upsert({
      where: {
        id_user_id_clinic: { id_user, id_clinic },
      },
      update: {
        points: score,
      },
      create: {
        points: score,
        id_user,
        id_clinic,
      },
    });

    return result ? true : false;
  }

  private async upsertSummaryScoreClinic(
    summaryScoreClinic: SummaryScore,
    id_clinic: string,
  ): Promise<boolean> {
    const {
      _count,
      _sum: { points },
    } = summaryScoreClinic;
    const result = await this.prismaService.clinic_Summary_Score.upsert({
      where: {
        id_clinic,
      },
      update: {
        total_users: _count,
        total_points: points,
      },
      create: {
        total_users: _count,
        total_points: points,
        id_clinic,
      },
    });
    return result ? true : false;
  }
}
