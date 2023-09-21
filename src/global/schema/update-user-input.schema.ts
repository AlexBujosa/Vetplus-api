import * as yup from 'yup';
import { documentRegex, namesOrSurnamesRegex, telephoneRegex } from '.';
export const UpdateUserInputSchema = yup.object().shape({
  names: yup.string().matches(/^[A-Za-záéíóúÁÉÍÓÚñÑüÜ\s'-]+$/),
  surnames: yup.string().matches(namesOrSurnamesRegex).nullable(),
  document: yup.string().matches(documentRegex),
  address: yup.string().nullable(),
  email: yup.string(),
  telephone_number: yup.string().matches(telephoneRegex).nullable(),
  image: yup.string().nullable(),
});
