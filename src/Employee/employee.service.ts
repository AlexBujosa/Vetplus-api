import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { EmployeeResult } from './constant';
import { TurnEmployeeStatusInput } from './graphql/input/turn-employee-status.input';

@Injectable()
export class EmployeeService {
  constructor(private prismaService: PrismaService) {}
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
}
