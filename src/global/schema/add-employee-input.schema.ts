import { EmployeeInvitationStatus } from '@prisma/client';
import * as yup from 'yup';
const { ACCEPTED, CANCELED, DECLINED, EXPIRED, PENDING } =
  EmployeeInvitationStatus;
export const AddEmployeeInputSchema = yup.object().shape({
  id: yup.string(),
  id_employee: yup.string(),
  employee_invitation_status: yup
    .string()
    .oneOf([ACCEPTED, CANCELED, DECLINED, EXPIRED, PENDING])
    .nullable(),
});
