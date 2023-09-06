import { EmployeeInvitationStatus } from '@prisma/client';

export enum ClinicResult {
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

export type ServiceResult = {
  service: {
    name: string;
  };
} & {
  id_clinic: string;
  id_service: string;
  created_at: Date;
  updated_at: Date;
  status: boolean;
};

export type EmployeeResult = {
  employee: {
    names: string;
    surnames: string;
    email: string;
  };
} & {
  id_clinic: string;
  id_employee: string;
  employee_invitation_status: EmployeeInvitationStatus;
  created_at: Date;
  updated_at: Date;
  status: boolean;
};

export type FavoriteClinic = {
  clinic: {
    name: string;
    address: string;
  };
} & {
  id_user: string;
  id_clinic: string;
  favorite: boolean;
  points: number;
};
