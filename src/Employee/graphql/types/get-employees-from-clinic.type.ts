import { ObjectType, Field } from '@nestjs/graphql';
import { Employee } from './employee.type';

@ObjectType()
export class GetEmployeesFromClinic extends Employee {
  @Field({ nullable: true })
  address: string;

  @Field({ nullable: true })
  telephone_number: string;
}
