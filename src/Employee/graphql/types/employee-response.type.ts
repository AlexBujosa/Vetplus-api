import { Status } from '@/global/constant/constants';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class EmployeeResponse {
  @Field()
  result: Status;
}
