import { BreedResult } from '@/breed/constant/contant';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class AddBreedResponse {
  @Field()
  result: BreedResult;
}
