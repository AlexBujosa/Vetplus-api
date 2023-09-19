import { ObjectType, Field } from '@nestjs/graphql';
import { Employee } from './employee.type';
import { ClinicEmployee } from './clinic-employee.type';

@ObjectType()
export class GetAllEmployeeResult extends ClinicEmployee {
  @Field(() => Employee)
  Employee: Employee;
}
