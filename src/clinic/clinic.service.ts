import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Clinic } from '@prisma/client';
import { AddClinicInput } from './graphql/input/add-clinic.input';

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
}
