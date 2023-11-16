import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { EmployeeResult, MyEmployees, OmitTx } from './constant';
import { TurnEmployeeStatusInput } from './graphql/input/turn-employee-status.input';
import { ClinicService } from '@/clinic/clinic.service';
import { SummaryScore, customException } from '@/global/constant/constants';
import { HandleEmployeeRequestInput } from './graphql/input/handle-employee-request.input';
import {
  EmployeeInvitationStatus,
  NotificationCategory,
  Role,
} from '@prisma/client';
import { AuthService } from '@/auth/auth.service';
import { InviteToClinicInput } from './graphql/input/invite-employee.input';
import { ScoreVeterinarianInput } from './graphql/input/score-veterinarian.input';
import { AddSpecialtyInput } from './graphql/input/add-specialty.input';
import { NotificationService } from '@/notification/notification.service';
import { SendNotificationInput } from '@/notification/graphql/input/sendNotification.input';
import { UserService } from '@/user/user.service';

@Injectable()
export class EmployeeService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly clinicService: ClinicService,
    private readonly authService: AuthService,
    private readonly notificationService: NotificationService,
    private readonly userService: UserService,
  ) {}
  async getAllEmployeeById(id_clinic: string): Promise<EmployeeResult[]> {
    const result = await this.prismaService.clinic_Employee.findMany({
      where: {
        id_clinic,
        employee_invitation_status: 'ACCEPTED',
      },
      include: {
        Employee: {
          include: {
            VeterinarianSummaryScore: true,
            VeterinariaSpecialties: true,
          },
        },
      },
    });
    return result;
  }

  async getMyEmployee(
    id_owner: string,
    id_employee: string,
  ): Promise<MyEmployees> {
    const result = await this.prismaService.clinic.findUnique({
      where: {
        id_owner,
      },
      include: {
        ClinicEmployees: {
          where: {
            id_employee,
          },
          include: {
            Employee: {
              include: {
                VeterinarianSummaryScore: {
                  select: {
                    total_points: true,
                    total_users: true,
                  },
                },
                VeterinariaSpecialties: {
                  select: {
                    specialties: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    return { ClinicEmployees: result?.ClinicEmployees };
    return result;
  }

  async getMyEmployess(id_owner: string): Promise<MyEmployees> {
    const result = await this.prismaService.clinic.findUnique({
      where: {
        id_owner,
      },
      include: {
        ClinicEmployees: {
          where: {
            employee_invitation_status: 'ACCEPTED',
          },
          include: {
            Employee: {
              include: {
                VeterinarianSummaryScore: {
                  select: {
                    total_points: true,
                    total_users: true,
                  },
                },
                VeterinariaSpecialties: {
                  select: {
                    specialties: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    return { ClinicEmployees: result?.ClinicEmployees };
  }

  async addSpecialty(
    addSpecialtyInput: AddSpecialtyInput,
    id_veterinarian: string,
  ): Promise<boolean> {
    const result = await this.prismaService.veterinarian_Specialties.upsert({
      create: {
        specialties: addSpecialtyInput.specialties,
        id_veterinarian,
      },
      update: {
        specialties: addSpecialtyInput.specialties,
      },
      where: {
        id_veterinarian,
      },
    });
    return result ? true : false;
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

  private async getPotentialEmployeeDetails(
    id_employee: string,
    id_clinic: string,
  ) {
    const userData = await this.userService.findById(id_employee);
    const clinicData = await this.clinicService.getClinicById(id_clinic);
    const { names, surnames } = userData;
    const { id_owner } = clinicData;

    const fullName = surnames ? `${names} ${surnames}` : names;
    return { fullName, id_owner };
  }

  async handleEmployeeRequest(
    handleEmployeeRequest: HandleEmployeeRequestInput,
    id_employee: string,
    role: Role,
  ): Promise<{ access_token: string }> {
    const { employee_invitation_status, id } = handleEmployeeRequest;
    const { fullName, id_owner } = await this.getPotentialEmployeeDetails(
      id_employee,
      id,
    );
    try {
      const transactionResult = await this.prismaService.$transaction(
        async (tx: OmitTx) => {
          const upsertClinicEmployee = await this.upsertClinicEmployee(
            id_employee,
            employee_invitation_status,
            id,
            tx,
          );

          if (!upsertClinicEmployee)
            throw Error("Employee response didn't update.");

          const sendNotification: SendNotificationInput = {
            id_user: id_owner,
            id_entity: id,
            category: NotificationCategory.INVITE_TO_CLINIC_RESPONSE,
            title: "User's response to invitation",
            subtitle: `${fullName} ${
              employee_invitation_status == 'ACCEPTED'
                ? 'has accepted your invitation'
                : 'has rejected your invitation'
            }`,
          };

          await this.notificationService.saveNotification(
            sendNotification,
            tx,
            employee_invitation_status,
          );

          if (
            role === Role.PET_OWNER &&
            employee_invitation_status === EmployeeInvitationStatus.ACCEPTED
          ) {
            const updatedUser = await tx.user.update({
              data: { role: Role.VETERINARIAN },
              where: { id: id_employee },
            });

            if (!updatedUser) {
              throw new Error("User role didn't update.");
            }

            const score = await tx.veterinarian_Summary_Score.create({
              data: {
                id_veterinarian: id_employee,
              },
            });

            if (!score) {
              throw new Error('Did not create veterinarian score');
            }

            const token = this.authService.login(updatedUser);
            return { token: token.access_token };
          }

          return { token: null };
        },
      );

      return { access_token: transactionResult.token };
    } catch (error) {
      throw customException.HANDLE_EMPLOYEE_REQUEST_FAILED({
        cause: new Error(),
        description: error.message,
      });
    }
  }

  private upsertClinicEmployee(
    id_employee: string,
    employee_invitation_status: EmployeeInvitationStatus,
    id_clinic: string,
    tx: OmitTx,
  ) {
    const result = tx.clinic_Employee.upsert({
      create: {
        employee_invitation_status,
        id_clinic,
        id_employee,
      },
      update: {
        employee_invitation_status,
      },
      where: {
        id_clinic_id_employee: { id_clinic, id_employee },
      },
    });
    return result;
  }

  async inviteToClinic(
    InviteToClinicInput: InviteToClinicInput,
    id_owner: string,
  ): Promise<boolean> {
    const my_clinic = await this.clinicService.getMyClinic(id_owner);

    const {
      id: id_clinic,
      email,
      employee_invitation_status,
    } = InviteToClinicInput;

    if (my_clinic?.id != id_clinic) throw customException.FORBIDDEN(null);

    const { id: id_user } = await this.userService.findByEmail(email);

    const notificationCreated = await this.prismaService.$transaction(
      async (tx: OmitTx) => {
        const employeeRequest = await this.upsertClinicEmployee(
          id_user,
          employee_invitation_status,
          id_clinic,
          tx,
        );

        if (!employeeRequest) throw customException.INVITATION_FAILED(null);

        const sendNotification: SendNotificationInput = {
          id_user,
          id_entity: employeeRequest.id_clinic,
          category: NotificationCategory.INVITE_TO_CLINIC,
          title: 'Clinic Invitation',
          subtitle: `${my_clinic.name} has invited you to join of them`,
        };

        const notificationCreated =
          await this.notificationService.saveNotification(
            sendNotification,
            tx,
            employee_invitation_status,
          );

        return notificationCreated;
      },
    );

    if (notificationCreated != null)
      await this.notificationService.sendNotificationToUser(
        id_user,
        notificationCreated,
      );

    return true;
  }

  async scoreEmployee(
    scoreVeterinarianInput: ScoreVeterinarianInput,
    id_owner: string,
  ) {
    try {
      const result = await this.prismaService.$transaction(
        async (tx: OmitTx) => {
          const scoreVeterinarian = await tx.veterinarian_PetOwner.create({
            data: {
              ...scoreVeterinarianInput,
              id_petowner: id_owner,
            },
          });

          if (!scoreVeterinarian)
            throw Error('Something is wrong with the veterinary score');

          const totalScoreVeterinarian: SummaryScore =
            await this.getTotalScoreVeterinarian(
              tx,
              scoreVeterinarianInput.id_veterinarian,
            );

          if (!totalScoreVeterinarian)
            throw Error(
              'Something is wrong getting the total score of the veterinarian',
            );

          await this.upsertSummaryScoreVeterinarian(
            totalScoreVeterinarian,
            id_owner,
          );

          return true;
        },
      );

      return result ? true : false;
    } catch (error) {
      throw customException.SCORE_VETERINARIAN_FAILED(error.message);
    }
  }

  async getTotalScoreVeterinarian(tx: OmitTx, id_veterinarian: string) {
    const result = await this.prismaService.veterinarian_PetOwner.groupBy({
      by: 'id_veterinarian',
      _sum: {
        points: true,
      },
      _count: true,
      where: {
        id_veterinarian,
        points: {
          not: {
            equals: null,
          },
        },
      },
    });
    return result[0];
  }

  private async upsertSummaryScoreVeterinarian(
    summaryScoreVeterinarian: SummaryScore,
    id_veterinarian: string,
  ): Promise<boolean> {
    const {
      _count,
      _sum: { points },
    } = summaryScoreVeterinarian;
    const result = await this.prismaService.veterinarian_Summary_Score.upsert({
      where: {
        id_veterinarian,
      },
      update: {
        total_users: _count,
        total_points: points,
      },
      create: {
        total_users: _count,
        total_points: points,
        id_veterinarian,
      },
    });
    return result ? true : false;
  }
}
