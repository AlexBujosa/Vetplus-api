import * as yup from 'yup';
import { documentRegex, namesOrSurnamesRegex, telephoneRegex } from '.';
export const UpdateUserInputSchema = yup.object().shape({
  names: yup.string().matches(/^[A-Za-záéíóúÁÉÍÓÚñÑüÜ\s'-]+$/),
  surnames: yup.string().matches(namesOrSurnamesRegex).nullable(),
  document: yup.string().matches(documentRegex).nullable(),
  address: yup.string().nullable(),
  telephone_number: yup.string().matches(telephoneRegex).nullable(),
  image: yup.string().nullable(),
});
