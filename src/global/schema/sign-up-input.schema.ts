import * as yup from 'yup';
export const SignUpInputSchema = yup.object().shape({
  names: yup.string().matches(/^[A-Za-záéíóúÁÉÍÓÚñÑüÜ\s'-]+$/),
  surnames: yup
    .string()
    .matches(/^[A-Za-záéíóúÁÉÍÓÚñÑüÜ\s'-]*$/)
    .nullable(),
  email: yup.string(),
  password: yup.string().nullable(),
  provider: yup.string().nullable(),
});
