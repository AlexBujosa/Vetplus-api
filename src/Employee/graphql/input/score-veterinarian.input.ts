import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class ScoreVeterinarianInput {
  @Field(() => String)
  id_appointment: string;

  @Field(() => String)
  id_veterinarian: string;

  @Field(() => Int, { nullable: true })
  points: number;
}
