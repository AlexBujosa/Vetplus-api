import { ObjectType, Field } from '@nestjs/graphql';
import { Clinic } from './clinic.type';
import { ClinicSummaryScore } from './clinic-summary-score.type';

@ObjectType()
export class GetAllClinic extends Clinic {
  @Field(() => ClinicSummaryScore)
  ClinicSummaryScore: ClinicSummaryScore;
}
