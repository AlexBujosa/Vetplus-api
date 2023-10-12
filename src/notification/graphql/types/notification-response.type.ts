import { ObjectType, Field } from '@nestjs/graphql';
import { Status } from '@/global/constant/constants';

@ObjectType()
export class NotificationResponse {
  @Field()
  result: Status;
}
