import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class HandleRequestResult {
  @Field(() => String)
  access_token: string;
}
