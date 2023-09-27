import * as yup from 'yup';
import { emailRegex, namesOrSurnamesRegex, passwordRegex } from '.';
export const SignUpInputSchema = yup.object().shape({
  names: yup.string().matches(namesOrSurnamesRegex),
  surnames: yup.string().matches(namesOrSurnamesRegex).nullable(),
  email: yup.string().matches(emailRegex),
  password: yup.string().matches(passwordRegex).nullable(),
  provider: yup.string().nullable(),
});
