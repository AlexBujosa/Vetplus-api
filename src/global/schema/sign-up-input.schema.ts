import * as yup from 'yup';
import { emailRegex, namesOrSurnamesRegex } from '.';
export const SignUpInputSchema = yup.object().shape({
  names: yup.string().matches(namesOrSurnamesRegex),
  surnames: yup.string().matches(namesOrSurnamesRegex).nullable(),
  email: yup.string().matches(emailRegex),
  password: yup.string().nullable(),
  provider: yup.string().nullable(),
});
