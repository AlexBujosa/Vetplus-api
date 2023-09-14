import { Injectable } from '@nestjs/common';
import { AddProcedureInput } from './graphql/input/add-procedure.input';
import { PrismaService } from '@/prisma/prisma.service';
import { Service } from '@prisma/client';
import { UpdateProcedureInput } from './graphql/input/update-procedure.input';
import { GenericByIdInput } from '@/global/graphql/input/generic-by-id.input';
import { GetAllProcedureByClinicId } from './graphql/types/get-all-procedure-by-clinic-id.type';
@Injectable()
export class ProcedureService {
  constructor(private readonly prismaService: PrismaService) {}
  async registerProcedure(
    addProcedureInput: AddProcedureInput,
  ): Promise<boolean> {
    const result = await this.prismaService.service.create({
      data: { ...addProcedureInput },
    });
    return result ? true : false;
  }

  async updateProcedure(
    updateProcedureInput: UpdateProcedureInput,
  ): Promise<boolean> {
    const { id, name } = updateProcedureInput;
    const result = await this.prismaService.service.update({
      data: {
        name,
      },
      where: {
        id,
      },
    });
    return result ? true : false;
  }

  async getAllProcedure(): Promise<Service[]> {
    const result = await this.prismaService.service.findMany();
    return result;
  }
  async getAllProcedureByClinicId(
    genericByIdInput: GenericByIdInput,
  ): Promise<GetAllProcedureByClinicId> {
    const { id } = genericByIdInput;
    const clinic = await this.prismaService.clinic.findFirst({
      select: {
        services: true,
      },
      where: {
        id,
      },
    });
    if (!clinic.services) return null;
    const clinic_service: GetAllProcedureByClinicId = JSON.parse(
      clinic.services,
    );
    return clinic_service;
  }
}
