import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Service {
  @Field(() => String)
  name: string;
}
