import { ObjectType, Field } from '@nestjs/graphql';
import { VeterinarianSummaryScore } from './veterinarian-summary-score.type';
import { VeterinarianSpecialties } from './veterinarian-specialties.type';

@ObjectType()
export class EmployeeSpecialtiesScore {
  @Field(() => VeterinarianSummaryScore)
  VeterinarianSummaryScore: VeterinarianSummaryScore;

  @Field(() => VeterinarianSpecialties, { nullable: true })
  VeterinariaSpecialties: VeterinarianSpecialties;
}
