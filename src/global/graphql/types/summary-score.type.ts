import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class SummaryScore {
  @Field(() => Int)
  total_points: number;

  @Field(() => Int)
  total_users: number;
}
