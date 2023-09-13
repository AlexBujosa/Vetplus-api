import { Field, ObjectType } from '@nestjs/graphql';

type result = 'COMPLETED' | 'FAILED';

@ObjectType()
export class UpdateUserResponse {
  @Field(() => String)
  result: result;
}
