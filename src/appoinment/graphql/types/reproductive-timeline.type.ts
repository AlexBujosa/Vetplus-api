import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class ReproductiveTimeline {
  @Field(() => String, { nullable: true })
  reproductiveHistory: 'INTACT' | 'NEUTERED';

  @Field(() => Date, { nullable: true })
  dateLastHeat: Date;

  @Field(() => Date, { nullable: true })
  dateLastBirth: Date;
}
