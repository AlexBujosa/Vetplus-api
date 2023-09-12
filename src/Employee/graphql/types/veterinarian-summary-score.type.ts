import { ObjectType, Field, Float, Int } from '@nestjs/graphql';

@ObjectType()
export class VeterinariaSummaryScore {
  @Field(() => Float)
  total_points: number;

  @Field(() => Int)
  total_users: number;
}
