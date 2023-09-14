import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Employee {
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
