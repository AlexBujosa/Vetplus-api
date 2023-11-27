import { InputType, Field } from '@nestjs/graphql';
import { FilterAppointmentByDateRangeInput } from './filter-appointment-by-range-date.input';

@InputType()
export class FilterAppointmentVerifiedInput extends FilterAppointmentByDateRangeInput {
  @Field(() => String, { nullable: true })
  state: 'CANCELLED' | 'DELAYED' | 'FINISHED' | 'IN_PROGRESS' | 'PENDING';
}
