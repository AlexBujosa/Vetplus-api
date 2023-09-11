import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { EmployeeResult, MyEmployees } from './constant';
import { TurnEmployeeStatusInput } from './graphql/input/turn-employee-status.input';
import { AddEmployeeInput } from './graphql/input/add-employee.input';
import { ClinicService } from '@/clinic/clinic.service';
import { customException } from '@/global/constant/constants';
import { HandleEmployeeRequestInput } from './graphql/input/handle-employee-request.input';
import { Prisma, PrismaClient, Role } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { AuthService } from '@/auth/auth.service';
type OmitTx = Omit<
  PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
  '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
>;
@Injectable()
export class EmployeeService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly clinicService: ClinicService,
    private readonly authService: AuthService,
  ) {}
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
            status: true,
          },
        },
      },
    });
    return result;
  }

  async getMyEmployess(id_owner: string): Promise<MyEmployees> {
    const result = await this.prismaService.clinic.findUnique({
      where: {
        id_owner,
      },
      include: {
        clinicEmployees: {
          where: {
            employee_invitation_status: 'ACCEPTED',
          },
          include: {
            employee: {
              select: {
                names: true,
                surnames: true,
                email: true,
                status: true,
              },
            },
          },
        },
      },
    });
    return { clinicEmployees: result.clinicEmployees };
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

  async handleEmployeeRequest(
    handleEmployeeRequest: HandleEmployeeRequestInput,
    id_employee: string,
    role: Role,
  ): Promise<{ access_token: string }> {
    const { employee_invitation_status } = handleEmployeeRequest;
    try {
      const result = await this.prismaService.$transaction(
        async (tx: OmitTx) => {
          await this.upsertClinicEmployee(
            id_employee,
            handleEmployeeRequest,
            tx,
          );

          if (role !== 'PET_OWNER' || employee_invitation_status !== 'ACCEPTED')
            return { user: null };

          const user = await tx.user.update({
            data: { role: 'VETERINARIAN' },
            where: { id: id_employee },
          });
          return { user: user };
        },
      );
      const token = result.user ? this.authService.login(result.user) : null;
      return result.user
        ? { access_token: token.access_token }
        : { access_token: null };
    } catch (error) {
      throw customException.HANDLE_EMPLOYEE_REQUEST_FAILED();
    }
  }
  private upsertClinicEmployee(
    id_employee: string,
    handleEmployeeRequestInput: HandleEmployeeRequestInput,
    tx: OmitTx,
  ) {
    const { employee_invitation_status, id } = handleEmployeeRequestInput;
    const result = tx.clinic_Employee.upsert({
      create: {
        employee_invitation_status,
        id_clinic: id,
        id_employee,
      },
      update: {
        employee_invitation_status,
      },
      where: {
        id_clinic_id_employee: { id_clinic: id, id_employee },
      },
    });
    return result;
  }

  async registerEmployee(
    addEmployeeInput: AddEmployeeInput,
    id_owner: string,
  ): Promise<boolean> {
    const my_clinic = await this.clinicService.getMyClinic(id_owner);
    const { id, ...rest } = addEmployeeInput;
    if (my_clinic.id != id) throw customException.FORBIDDEN();
    const result = await this.prismaService.clinic_Employee.create({
      data: {
        ...rest,
        id_clinic: id,
      },
    });
    return result ? true : false;
  }
}
