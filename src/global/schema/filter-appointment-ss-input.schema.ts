import * as yup from 'yup';
export const FilterAppointmentSSInputSchema = yup.object().shape({
  state: yup
    .string()
    .oneOf(
      ['CANCELLED', 'DELAYED', 'FINISHED', 'IN_PROGRESS', 'PENDING'],
      'Invalid State. Choose a good a ones -> CANCELLED, DELAYED, FINISHED, IN_PROGRESS and PENDING',
    )
    .nullable(),
  appointment_status: yup
    .string()
    .oneOf(
      ['ACCEPTED', 'DENIED'],
      'Choose a good a ones -> ACCEPTED and DENIED',
    )
    .nullable(),
});
