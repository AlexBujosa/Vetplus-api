import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class MessageInput {
  @Field(() => String)
  token: string;

  @Field(() => String)
  body: string;
}
