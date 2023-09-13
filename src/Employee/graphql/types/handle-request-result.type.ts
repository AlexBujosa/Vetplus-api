import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class HandleRequestResult {
  @Field({ nullable: true })
  access_token: string;
}
