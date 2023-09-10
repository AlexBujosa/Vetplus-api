import { EmployeeInvitationStatus } from '@prisma/client';

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
