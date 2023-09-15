import { ObjectType, Field } from '@nestjs/graphql';
import { EmployeeSpecialtiesScore } from './employee-specialties-score.type';

@ObjectType()
export class Employee extends EmployeeSpecialtiesScore {
  @Field(() => String)
  names: string;

  @Field({ nullable: true })
  surnames: string;

  @Field({ nullable: true })
  image: string;

  @Field(() => String)
  email: string;

  @Field(() => Boolean)
  status: boolean;
}
