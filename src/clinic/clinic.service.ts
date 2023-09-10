import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Clinic } from '@prisma/client';
import { AddClinicInput } from './graphql/input/add-clinic.input';
import {
  EmployeeResult,
  FavoriteClinic,
  ServiceResult,
  SummaryScoreClinic,
} from './constant';
import { MarkAsFavoriteClinicInput } from './graphql/input/mark-as-favorite-clinic.input';
import { ScoreClinicInput } from './graphql/input/score-clinic.input';
import { TurnEmployeeStatusInput } from './graphql/input/turn-employee-status.input';
import { customException } from '@/global/constant/constants';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class ClinicService {
  constructor(private readonly prismaService: PrismaService) {}
  async createClinic(
    addClinicInput: AddClinicInput,
    id_owner: string,
  ): Promise<boolean> {
    try {
      const result = await this.prismaService.clinic.create({
        data: {
          ...addClinicInput,
          id_owner,
        },
      });
      if (!result) return false;
      return true;
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code == 'P2002'
      ) {
        throw customException.ALREADY_HAVE_CLINIC();
      }
    }
  }

  async getMyClinic(id_owner: string): Promise<Clinic> {
    const result = await this.prismaService.clinic.findUnique({
      where: {
        id_owner,
      },
    });
    return result;
  }

  async getAllClinic(): Promise<Clinic[]> {
    const result = await this.prismaService.clinic.findMany();
    return result;
  }

  async getClinicById(id: string): Promise<Clinic> {
    const result = await this.prismaService.clinic.findFirst({
      where: {
        id,
      },
    });
    return result;
  }

  async getAllServicesById(id_clinic: string): Promise<ServiceResult[]> {
    const result = await this.prismaService.clinic_Service.findMany({
      where: {
        id_clinic,
      },
      include: {
        service: {
          select: {
            name: true,
          },
        },
      },
    });
    return result;
  }

  async getAllEmployeeById(id_clinic: string): Promise<EmployeeResult[]> {
    const result = await this.prismaService.clinic_Employee.findMany({
      where: {
        id_clinic,
        employee_invitation_status: 'ACCEPTED',
      },
      include: {
        employee: {
          select: {
            names: true,
            surnames: true,
            email: true,
          },
        },
      },
    });
    return result;
  }

  async turnEmployeeStatus(
    turnEmployeeStatusInput: TurnEmployeeStatusInput,
  ): Promise<boolean> {
    const { id_employee, id, status } = turnEmployeeStatusInput;
    const result = await this.prismaService.clinic_Employee.update({
      data: {
        status,
      },
      where: {
        id_clinic_id_employee: { id_clinic: id, id_employee },
      },
    });
    return result ? true : false;
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
    summaryScoreClinic: SummaryScoreClinic,
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
