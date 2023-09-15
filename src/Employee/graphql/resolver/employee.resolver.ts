import { Args, Context, Mutation, Resolver, Query } from '@nestjs/graphql';
import { UseGuards, UsePipes } from '@nestjs/common';
import { JwtAuthGuard } from '@/global/guard/jwt-auth.guard';
import { RolesGuard } from '@/global/guard/roles.guard';
import { Roles } from '@/global/decorator/roles.decorator';
import { Role } from '@prisma/client';
import { TurnEmployeeStatusInput } from '../input/turn-employee-status.input';
import { EmployeeResponse } from '../types/employee-response.type';
import { Status } from '@/global/constant/constants';
import { InviteToClinicInput } from '../input/invite-employee.input';
import { GetAllEmployeeByClinicIdInput } from '../input/get-all-employee-by-id.input';
import { HandleEmployeeRequestInput } from '../input/handle-employee-request.input';
import { YupValidationPipe } from '@/global/pipe/yup-validation.pipe';
import { InviteToClinicInputSchema } from '@/global/schema/add-employee-input.schema';
import { HandleRequestResult } from '../types/handle-request-result.type';
import { EmployeeService } from '@/Employee/employee.service';
import { GetAllEmployeeResult } from '../types/get-all-employee-result.type';
import { GetMyEmployeesResult } from '../types/get-my-employees-result.type';
import { ScoreVeterinarianInput } from '../input/score-veterinarian.input';
import { AddSpecialtyInput } from '../input/add-specialty.input';

@Resolver()
export class EmployeeResolver {
  constructor(private readonly employeeService: EmployeeService) {}

  @Query(() => [GetAllEmployeeResult])
  @Roles(Role.ADMIN, Role.CLINIC_OWNER, Role.PET_OWNER, Role.VETERINARIAN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getAllEmployee(
    @Args('getAllEmployeeByClinicIdInput')
    getAllEmployeeByClinicIdInput: GetAllEmployeeByClinicIdInput,
  ): Promise<GetAllEmployeeResult[]> {
    const { id } = getAllEmployeeByClinicIdInput;
    return await this.employeeService.getAllEmployeeById(id);
  }

  @Query(() => GetMyEmployeesResult)
  @Roles(Role.ADMIN, Role.CLINIC_OWNER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getMyEmployees(@Context() context): Promise<GetMyEmployeesResult> {
    return await this.employeeService.getMyEmployess(context.req.user.sub);
  }

  @Mutation(() => EmployeeResponse)
  @Roles(Role.VETERINARIAN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async registerSpecialty(
    @Args('addSpecialtyInput') addSpecialtyInput: AddSpecialtyInput,
    @Context() context,
  ): Promise<EmployeeResponse> {
    const result = await this.employeeService.addSpecialty(
      addSpecialtyInput,
      context.req.user.sub,
    );
    return !result ? { result: Status.FAILED } : { result: Status.COMPLETED };
  }

  @Mutation(() => EmployeeResponse)
  @Roles(Role.ADMIN, Role.CLINIC_OWNER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async changeEmployeeStatus(
    @Args('turnEmployeeStatusInput')
    turnEmployeeStatusInput: TurnEmployeeStatusInput,
  ): Promise<EmployeeResponse> {
    const result = await this.employeeService.turnEmployeeStatus(
      turnEmployeeStatusInput,
    );

    return !result ? { result: Status.FAILED } : { result: Status.COMPLETED };
  }

  @Mutation(() => EmployeeResponse)
  @Roles(Role.ADMIN, Role.CLINIC_OWNER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UsePipes(new YupValidationPipe(InviteToClinicInputSchema))
  async inviteToClinic(
    @Args('inviteToClinicInput')
    inviteToClinicInput: InviteToClinicInput,
    @Context() context,
  ): Promise<EmployeeResponse> {
    const result = await this.employeeService.inviteToClinic(
      inviteToClinicInput,
      context.req.user.sub,
    );

    return !result ? { result: Status.FAILED } : { result: Status.COMPLETED };
  }

  @Mutation(() => HandleRequestResult)
  @Roles(Role.PET_OWNER, Role.VETERINARIAN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async handleEmployeeRequest(
    @Args('handleEmployeeRequestInput')
    handleEmployeeRequestInput: HandleEmployeeRequestInput,
    @Context() context,
  ): Promise<HandleRequestResult> {
    const result = await this.employeeService.handleEmployeeRequest(
      handleEmployeeRequestInput,
      context.req.user.sub,
      context.req.user.role,
    );

    return result;
  }

  @Mutation(() => EmployeeResponse)
  @Roles(Role.PET_OWNER, Role.VETERINARIAN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async scoreVeterinarian(
    @Args('scoreVeterinarianInput')
    scoreVeterinarianInput: ScoreVeterinarianInput,
    @Context() context,
  ): Promise<EmployeeResponse> {
    const result = await this.employeeService.scoreEmployee(
      scoreVeterinarianInput,
      context.req.user.sub,
    );

    return !result ? { result: Status.FAILED } : { result: Status.COMPLETED };
  }
}
