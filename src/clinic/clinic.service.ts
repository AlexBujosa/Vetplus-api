import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Clinic } from '@prisma/client';
import { AddClinicInput } from './graphql/input/add-clinic.input';
import { EmployeeResult, FavoriteClinic, ServiceResult } from './constant';
import { MarkAsFavoriteClinicInput } from './graphql/input/mark-as-favorite-clinic.input';
import { ScoreClinicInput } from './graphql/input/score-clinic.input';

@Injectable()
export class ClinicService {
  constructor(private readonly prismaService: PrismaService) {}
  async createClinic(
    addClinicInput: AddClinicInput,
    id_owner: string,
  ): Promise<boolean> {
    const result = await this.prismaService.clinic.create({
      data: {
        ...addClinicInput,
        id_owner,
      },
    });
    if (!result) return false;
    return true;
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
    const result = await this.upsertScoreClinic(scoreClinicInput, id_user);

    return result ? true : false;
  }

  async getTotalScoreClinic(id_clinic: string) {
    const result = this.prismaService.clinic_User.groupBy({
      by: 'id_clinic',
      _sum: {
        points: true,
      },
      _count: true,
      where: {
        id_clinic,
      },
    });
    return { total_points: 1 };
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
        id_user,
        id_clinic,
      },
    });

    return result ? true : false;
  }
}
