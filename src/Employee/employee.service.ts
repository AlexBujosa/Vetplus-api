import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { EmployeeResult } from './constant';

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
}
