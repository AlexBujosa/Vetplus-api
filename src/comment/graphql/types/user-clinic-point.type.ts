import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class UserClinicPoint {
  @Field(() => Int)
  points: number;
}
