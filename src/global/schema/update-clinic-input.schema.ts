import * as yup from 'yup';
import { namesOrSurnamesRegex, telephoneRegex } from '.';
const timeFormatRegex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;
export const UpdateClinicInputSchema = yup.object().shape({
  name: yup.string().matches(namesOrSurnamesRegex),
  image: yup.string().nullable(),
  telephone_number: yup.string().matches(telephoneRegex),
  google_maps_url: yup.string().nullable(),
  address: yup.string(),
  services: yup.array().of(yup.string()).nullable(),
  schedule: yup
    .object()
    .shape({
      workingDays: yup
        .array()
        .of(
          yup.object().shape({
            day: yup.string(),
            startTime: yup
              .string()
              .matches(timeFormatRegex, 'Invalid time format (HH:mm:ss)'),
            endTime: yup
              .string()
              .matches(timeFormatRegex, 'Invalid time format (HH:mm:ss)'),
          }),
        )
        .nullable(),
      nonWorkingDays: yup
        .array()
        .of(
          yup
            .string()
            .matches(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)'),
        )
        .nullable(),
    })
    .nullable(),
});
