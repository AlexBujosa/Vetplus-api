import { ObjectType, Field } from '@nestjs/graphql';
import { ClinicServiceArray } from './clinic-services-array.type';
import { ClinicSummaryScore } from './clinic-summary-score.type';

@ObjectType()
export class GetClinicResult extends ClinicServiceArray {
  @Field(() => ClinicSummaryScore)
  clinicSummaryScore: ClinicSummaryScore;
}
