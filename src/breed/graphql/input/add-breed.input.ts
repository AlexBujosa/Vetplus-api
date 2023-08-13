import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class AddBreedInput {
  @Field(() => Int)
  id_specie: number;
  @Field(() => String)
  name: string;
}
