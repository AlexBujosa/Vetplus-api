import { BreedResult } from '@/breed/constant';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class AddBreedResponse {
  @Field()
  result: BreedResult;
}
