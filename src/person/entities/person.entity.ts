import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Person {
  @Field({ nullable: true })
  id: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  names: string;

  @Field()
  surnames: string;

  @Field({ nullable: true })
  document: string;

  @Field({ nullable: true })
  address: string;

  @Field({ nullable: true })
  telephone_number: string;

  @Field({ nullable: true })
  image: string;
}
