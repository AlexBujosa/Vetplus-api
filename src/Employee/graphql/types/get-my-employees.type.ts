import { ObjectType, Field } from '@nestjs/graphql';
import { ClinicEmployeeResult } from './clinic-employee-result.type';

@ObjectType()
export class GetMyEmployeesResult {
  @Field(() => [ClinicEmployeeResult])
  clinicEmployees: ClinicEmployeeResult[];
}
