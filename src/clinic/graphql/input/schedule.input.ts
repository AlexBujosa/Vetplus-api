import { InputType, Field } from '@nestjs/graphql';
import { NonWorkingDaysInput } from './non-working-days.input';
import { WorkingDaysInput } from './working-days.input';
@InputType()
export class ScheduleInput extends NonWorkingDaysInput {
  @Field(() => [WorkingDaysInput])
  workingDays: WorkingDaysInput[];
}
