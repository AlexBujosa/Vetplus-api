import { Status } from '@/global/constant/constants';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class SavePetImageResponse {
  @Field()
  result: Status;

  @Field({ nullable: true })
  image: string;
}
