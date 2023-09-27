import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class VerificationCodeInput {
  @Field(() => Int)
  verificationCode: number;

  @Field(() => String)
  room: string;
}
