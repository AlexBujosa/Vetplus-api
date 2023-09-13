import { Status } from '@/global/constant/constants';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class SaveUserImageResponse {
  @Field()
  result: Status;

  @Field({ nullable: true })
  image: string;
}
