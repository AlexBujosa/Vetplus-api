import { createUnionType } from '@nestjs/graphql';
import { EmployeeInvitationStatus, Prisma, PrismaClient } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { Employee } from '../graphql/types/employee.type';
import { VeterinarianSummaryScore } from '../graphql/types/veterinarian-summary-score.type';

export type EmployeeResult = {
  Employee: {
    names: string;
    surnames: string;
    image: string;
    email: string;
    telephone_number: string;
    status: boolean;
  } & {
    VeterinarianSummaryScore: {
      total_points: number;
      total_users: number;
    };
  } & {
    VeterinariaSpecialties: {
      specialties: string;
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

export type EmployeeType = {
  names: string;
  surnames: string;
  email: string;
  image: string;
  status: boolean;
  address: string;
  telephone_number: string;
} & {
  VeterinarianSummaryScore: {
    total_points: number;
    total_users: number;
  };
} & {
  VeterinariaSpecialties: {
    specialties: string;
  };
};

export type GetMyEmployeeResult = {
  Employee: EmployeeType;
} & {
  id_clinic: string;
  id_employee: string;
  employee_invitation_status: EmployeeInvitationStatus;
  created_at: Date;
  updated_at: Date;
  status: boolean;
};
export type MyEmployees = {
  ClinicEmployees: GetMyEmployeeResult[];
};

export type MyEmployee = {
  clinicEmployees: GetMyEmployeeResult;
};

export type OmitTx = Omit<
  PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
  '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
>;

export const EmployeeVeterinarianSummaryScore = createUnionType({
  name: 'EmployeeVeterinarianSummaryScoreUnion',
  types: () => [Employee, VeterinarianSummaryScore] as const,
});
