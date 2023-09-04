import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Breed {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  id_specie: number;

  @Field(() => String)
  name: string;

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;

  @Field(() => Boolean)
  status: boolean;
}
