import { Status } from '@/global/constant/constants';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class DeleteUserImageResponse {
  @Field()
  result: Status;
}
