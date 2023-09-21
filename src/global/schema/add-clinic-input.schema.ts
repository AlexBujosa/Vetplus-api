import * as yup from 'yup';
import { emailRegex, namesOrSurnamesRegex, telephoneRegex } from '.';
export const AddClinicInputSchema = yup.object().shape({
  name: yup.string().matches(namesOrSurnamesRegex),
  email: yup.string().matches(emailRegex).nullable(),
  telephone_number: yup.string().matches(telephoneRegex),
  google_maps_url: yup.string().nullable(),
  address: yup.string(),
});
