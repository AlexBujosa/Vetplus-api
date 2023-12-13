import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AddProcedureInput } from '../input/add-procedure.input';
import { ProcedureService } from '@/procedure/procedure.service';
import { AddProcedureResponse } from '../types/add-procedure-response.type';
import { Status } from '@/global/constant/constants';
import { Roles } from '@/global/decorator/roles.decorator';
import { Role } from '@prisma/client';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@/global/guard/jwt-auth.guard';
import { RolesGuard } from '@/global/guard/roles.guard';
import { Procedure } from '../types/procedure.type';
import { UpdateProcedureInput } from '../input/update-procedure.input';
import { UpdateProcedureResponse } from '../types/update-procedure-response.type';
import { GetAllProcedureByClinicId } from '../types/get-all-procedure-by-clinic-id.type';
import { GenericByIdInput } from '@/global/graphql/input/generic-by-id.input';

@Resolver(() => [])
export class ProcedureResolver {
  constructor(private readonly procedureService: ProcedureService) {}
  @Mutation(() => AddProcedureResponse)
  @Roles(Role.ADMIN, Role.CLINIC_OWNER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async registerProcedure(
    @Args('addProcedureInput') addProcedureInput: AddProcedureInput,
  ): Promise<AddProcedureResponse> {
    const result = await this.procedureService.registerProcedure(
      addProcedureInput,
    );
    return result ? { result: Status.COMPLETED } : { result: Status.FAILED };
  }

  @Mutation(() => UpdateProcedureResponse)
  @Roles(Role.ADMIN, Role.CLINIC_OWNER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updateProcedure(
    @Args('updateProcedureInput') updateProcedureInput: UpdateProcedureInput,
  ): Promise<AddProcedureResponse> {
    const result = await this.procedureService.updateProcedure(
      updateProcedureInput,
    );
    return result ? { result: Status.COMPLETED } : { result: Status.FAILED };
  }

  @Query(() => [Procedure])
  async getAllProcedure(): Promise<Procedure[]> {
    const result = await this.procedureService.getAllProcedure();
    return result;
  }

  @Query(() => GetAllProcedureByClinicId)
  async getAllProcedureByIdClinic(
    @Args('genericByIdInput') genericByIdInput: GenericByIdInput,
  ): Promise<GetAllProcedureByClinicId> {
    const result = await this.procedureService.getAllProcedureByClinicId(
      genericByIdInput,
    );
    return result;
  }
}
