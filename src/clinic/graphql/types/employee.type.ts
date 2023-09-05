import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Employee {
  @Field(() => String)
  names: string;

  @Field(() => String)
  surnames: string;

  @Field(() => String)
  email: string;
}
