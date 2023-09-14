import { ObjectType, Field } from '@nestjs/graphql';
import { ClinicEmployee } from './clinic-employee.type';
import { EmployeeSpecialtiesScore } from './employee-specialties-score.type';

@ObjectType()
export class GetMyEmployee extends ClinicEmployee {
  @Field(() => EmployeeSpecialtiesScore)
  employee: EmployeeSpecialtiesScore;
}
