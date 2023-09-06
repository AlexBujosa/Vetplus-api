import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class ScoreClinicInput {
  @Field(() => String)
  id_clinic: string;

  @Field(() => Float)
  score: number;
}
