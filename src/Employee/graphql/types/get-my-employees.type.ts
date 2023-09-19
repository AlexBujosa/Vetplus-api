import { ObjectType, Field } from '@nestjs/graphql';
import { ClinicEmployee } from './clinic-employee.type';
import { GetEmployeesFromClinic } from './get-employees-from-clinic.type';

@ObjectType()
export class GetMyEmployee extends ClinicEmployee {
  @Field(() => GetEmployeesFromClinic)
  Employee: GetEmployeesFromClinic;
}
