import { ObjectType, Field } from '@nestjs/graphql';
import { Employee } from './employee.type';
import { VeterinarianSummaryScore } from './veterinarian-summary-score.type';
import { VeterinarianSpecialties } from './veterinarian-specialties.type';

@ObjectType()
export class EmployeeSpecialtiesScore extends Employee {
  @Field(() => VeterinarianSummaryScore)
  VeterinarianSummaryScore: VeterinarianSummaryScore;

  @Field(() => VeterinarianSpecialties, { nullable: true })
  VeterinariaSpecialties: VeterinarianSpecialties;
}
