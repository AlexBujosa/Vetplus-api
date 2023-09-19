import { Status } from '@/global/constant/constants';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class SaveImageResponse {
  @Field()
  result: Status;

  @Field({ nullable: true })
  image: string;
}
