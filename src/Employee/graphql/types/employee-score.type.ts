import { ObjectType, Field } from '@nestjs/graphql';
import { Employee } from './employee.type';
import { VeterinariaSummaryScore } from './veterinarian-summary-score.type';

@ObjectType()
export class EmployeeScore extends Employee {
  @Field(() => VeterinariaSummaryScore)
  VeterinarianSummaryScore: VeterinariaSummaryScore;
}
