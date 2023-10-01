import { EmployeeInvitationStatus } from '@prisma/client';
import * as yup from 'yup';
const { CANCELED, PENDING } = EmployeeInvitationStatus;
export const InviteToClinicInputSchema = yup.object().shape({
  id: yup.string(),
  id_employee: yup.string(),
  employee_invitation_status: yup
    .string()
    .oneOf([CANCELED, PENDING])
    .nullable(),
});
