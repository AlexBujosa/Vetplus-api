import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class MessageResponse {
  @Field()
  email: string;

  @Field()
  password: string;
}
