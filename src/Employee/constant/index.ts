import { createUnionType } from '@nestjs/graphql';
import { EmployeeInvitationStatus, Prisma, PrismaClient } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { Employee } from '../graphql/types/employee.type';
import { VeterinariaSummaryScore } from '../graphql/types/veterinarian-summary-score.type';

export type EmployeeResult = {
  employee: {
    names: string;
    surnames: string;
    email: string;
    status: boolean;
  };
} & {
  id_clinic: string;
  id_employee: string;
  employee_invitation_status: EmployeeInvitationStatus;
  created_at: Date;
  updated_at: Date;
  status: boolean;
};

export type GetMyEmployeeResult = {
  employee: {
    names: string;
    surnames: string;
    email: string;
    status: boolean;
  } & {
    VeterinarianSummaryScore: {
      total_points: number;
      total_users: number;
    };
  };
} & {
  id_clinic: string;
  id_employee: string;
  employee_invitation_status: EmployeeInvitationStatus;
  created_at: Date;
  updated_at: Date;
  status: boolean;
};
export type MyEmployees = {
  clinicEmployees: GetMyEmployeeResult[];
};

export type OmitTx = Omit<
  PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
  '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
>;

export const EmployeeVeterinarianSummaryScore = createUnionType({
  name: 'EmployeeVeterinarianSummaryScoreUnion',
  types: () => [Employee, VeterinariaSummaryScore] as const,
});
