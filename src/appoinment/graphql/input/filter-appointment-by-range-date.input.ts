import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class FilterAppointmentByDateRangeInput {
  @Field(() => Date, { nullable: true })
  start_at: Date;

  @Field(() => Date, { nullable: true })
  end_at: Date;
}
