import * as yup from 'yup';
export const ScoreClinicInputSchema = yup.object().shape({
  id_clinic: yup.string(),
  score: yup
    .number()
    .oneOf(
      [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5],
      'Invalid Score, Please select a good ones',
    ),
});
