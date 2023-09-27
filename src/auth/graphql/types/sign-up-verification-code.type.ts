import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SignUpVerificationCode {
  @Field(() => String)
  room: string;
}
