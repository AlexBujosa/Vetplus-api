import { Injectable } from '@nestjs/common';
import { AddProcedureInput } from './graphql/input/add-procedure.input';
import { PrismaService } from '@/prisma/prisma.service';
import { Service } from '@prisma/client';
import { UpdateProcedureInput } from './graphql/input/update-procedure.input';
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
}
