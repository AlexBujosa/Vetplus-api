import { CreateUserResult } from '@/user/constant/constants';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CreatedUserResponse {
  @Field(() => String)
  result: CreateUserResult;
}
