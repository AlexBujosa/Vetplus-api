import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class AddReproductiveTimelineInput {
  @Field(() => String, { nullable: true })
  reproductiveHistory: 'INTACT' | 'NEUTERED';

  @Field(() => Date, { nullable: true })
  dateLastHeat: Date;

  @Field(() => Date, { nullable: true })
  dateLastBirth: Date;
}
