import { SignUpResult } from '@/auth/constant/contants';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CreatedUserResponse {
  @Field(() => String)
  result: SignUpResult;
  @Field(() => String)
  message: string;
}
