import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Service {
  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;
}
