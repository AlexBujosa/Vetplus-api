import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Clinic, Clinic_Service } from '@prisma/client';
import { AddClinicInput } from './graphql/input/add-clinic.input';
import { ServiceResult } from './constant';

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
            description: true,
          },
        },
      },
    });
    return result;
  }
}
