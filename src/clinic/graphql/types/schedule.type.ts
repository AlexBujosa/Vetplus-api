import { ObjectType, Field } from '@nestjs/graphql';
import { WorkingDays } from './working-days.type';

@ObjectType()
export class Schedule {
  @Field(() => [WorkingDays])
  workingDays: WorkingDays[];

  @Field(() => [String])
  nonWorkingDays: string[];
}
