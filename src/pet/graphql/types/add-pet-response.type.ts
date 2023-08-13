import { ObjectType, Field } from '@nestjs/graphql';
import { AddPetResult } from '../constant/constants';

@ObjectType()
export class AddPetResponse {
  @Field()
  result: AddPetResult;
}
