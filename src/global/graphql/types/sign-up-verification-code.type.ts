import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class VerificationCode {
  @Field(() => String)
  room: string;
}
