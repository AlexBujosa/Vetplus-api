import { Args, Context, Mutation, Resolver, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@/global/guard/jwt-auth.guard';
import { RolesGuard } from '@/global/guard/roles.guard';
import { Roles } from '@/global/decorator/roles.decorator';
import { Role } from '@prisma/client';
import { EmployeeService } from '@/Employee/employee.service';
import { ClinicEmployeeResult } from '../types/clinic-employee-result.type';
import { GetAllEmployeeByIdInput } from '../input/get-all-employee-by-id.input';

@Resolver()
export class EmployeeResolver {
  constructor(private readonly employeeService: EmployeeService) {}

  @Query(() => [ClinicEmployeeResult])
  @Roles(Role.ADMIN, Role.CLINIC_OWNER, Role.PET_OWNER, Role.VETERINARIAN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getAllEmployee(
    @Args('getAllEmployeeByIdInput')
    getAllEmployeeByIdInput: GetAllEmployeeByIdInput,
  ): Promise<ClinicEmployeeResult[]> {
    const { id } = getAllEmployeeByIdInput;
    return await this.employeeService.getAllEmployeeById(id);
  }
}
