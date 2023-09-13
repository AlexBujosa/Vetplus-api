import { Status } from '@/global/constant/constants';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AddProcedureResponse {
  @Field(() => String)
  result: Status;
}
