import * as yup from 'yup';
export const ScoreClinicInputSchema = yup.object().shape({
  id_clinic: yup.string(),
  score: yup
    .number()
    .oneOf([1, 2, 3, 4, 5], 'Invalid Score, Please select a good ones')
    .nullable(),
});
