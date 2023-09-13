import { ObjectType, Field } from '@nestjs/graphql';
import { ClinicEmployee } from './clinic-employee.type';
import { EmployeeScore } from './employee-score.type';

@ObjectType()
export class GetMyEmployee extends ClinicEmployee {
  @Field(() => EmployeeScore)
  employee: EmployeeScore;
}
