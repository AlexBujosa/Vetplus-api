import * as yup from 'yup';
export const AddClinicInputSchema = yup.object().shape({
  name: yup.string(),
  surnames: yup
    .string()
    .matches(/^[A-Za-záéíóúÁÉÍÓÚñÑüÜ\s'-]*$/)
    .nullable(),
  telephone_number: yup.string().matches(/^\d{10}$/),
  google_maps_url: yup.string().nullable(),
  address: yup.string(),
});
