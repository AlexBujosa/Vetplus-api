import { SpecieResult } from '@/specie/constant/contant';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class AddSpecieResponse {
  @Field()
  result: SpecieResult;
}
