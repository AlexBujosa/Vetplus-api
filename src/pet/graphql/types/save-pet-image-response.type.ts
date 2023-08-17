import { ObjectType, Field } from '@nestjs/graphql';
import { AddPetResult as SavePetImageResult } from '../constant/constants';

@ObjectType()
export class SavePetImageResponse {
  @Field()
  result: SavePetImageResult;

  @Field({ nullable: true })
  image: string;
}
