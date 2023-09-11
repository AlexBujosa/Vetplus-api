import { Args, Context, Mutation, Resolver, Query } from '@nestjs/graphql';
import { UseGuards, UsePipes } from '@nestjs/common';
import { JwtAuthGuard } from '@/global/guard/jwt-auth.guard';
import { RolesGuard } from '@/global/guard/roles.guard';
import { Roles } from '@/global/decorator/roles.decorator';
import { Role } from '@prisma/client';
import { EmployeeService } from '@/Employee/employee.service';
import { ClinicEmployeeResult } from '../types/clinic-employee-result.type';
import { TurnEmployeeStatusInput } from '../input/turn-employee-status.input';
import { EmployeeResponse } from '../types/employee-response.type';
import { Status } from '@/global/constant/constants';
import { AddEmployeeInput } from '../input/add-employee.input';
import { GetAllEmployeeByClinicIdInput } from '../input/get-all-employee-by-id.input';
import { GetMyEmployeesResult } from '../types/get-my-employees.type';
import { HandleEmployeeRequestInput } from '../input/handle-employee-request.input';
import { YupValidationPipe } from '@/global/pipe/yup-validation.pipe';
import { AddEmployeeInputSchema } from '@/global/schema/add-employee-input.schema';
import { HandleRequestResult } from '../types/handle-request-result.type';

@Resolver()
export class EmployeeResolver {
  constructor(private readonly employeeService: EmployeeService) {}

  @Query(() => [ClinicEmployeeResult])
  @Roles(Role.ADMIN, Role.CLINIC_OWNER, Role.PET_OWNER, Role.VETERINARIAN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getAllEmployee(
    @Args('getAllEmployeeByClinicIdInput')
    getAllEmployeeByClinicIdInput: GetAllEmployeeByClinicIdInput,
  ): Promise<ClinicEmployeeResult[]> {
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
  @UsePipes(new YupValidationPipe(AddEmployeeInputSchema))
  async registerEmployee(
    @Args('addEmployeeInput')
    addEmployeeInput: AddEmployeeInput,
    @Context() context,
  ): Promise<EmployeeResponse> {
    const result = await this.employeeService.registerEmployee(
      addEmployeeInput,
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
}
