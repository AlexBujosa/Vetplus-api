import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class ScoreClinicInput {
  @Field(() => String)
  id_clinic: string;

  @Field({ nullable: true })
  score: number;
}
