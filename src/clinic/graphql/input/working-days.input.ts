import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class WorkingDaysInput {
  @Field(() => String)
  day: string;

  @Field(() => String)
  startTime: string;

  @Field(() => String)
  endTime: string;
}
