import { Status } from '@/global/constant/constants';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GeneralResponse {
  @Field(() => String)
  result: Status;
}
