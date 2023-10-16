import { ObjectType, Field } from '@nestjs/graphql';
import { ClinicSummaryScore } from './clinic-summary-score.type';
import { ClinicServiceArray } from './clinic-services-array.type';

@ObjectType()
export class GetAllClinic extends ClinicServiceArray {
  @Field(() => ClinicSummaryScore)
  ClinicSummaryScore: ClinicSummaryScore;
}
