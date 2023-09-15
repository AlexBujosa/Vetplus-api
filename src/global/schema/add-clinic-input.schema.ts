import * as yup from 'yup';
export const AddClinicInputSchema = yup.object().shape({
  name: yup.string(),
  email: yup
    .string()
    .matches(
      /^(?:[a-zA-Z0-9._%+-]+@gmail\.com|[^@]+@(?:hotmail\.com|outlook\.com))$/,
    )
    .nullable(),
  telephone_number: yup.string().matches(/^\d{10}$/),
  google_maps_url: yup.string().nullable(),
  address: yup.string(),
});
