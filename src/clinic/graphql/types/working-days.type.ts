import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class WorkingDays {
  @Field(() => String)
  day: string;

  @Field(() => String)
  startTime: string;

  @Field(() => String)
  endTime: string;
}
