import { GenericByIdInput } from '@/global/graphql/input/generic-by-id.input';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class FilterAppointmentByDateRangeInput extends GenericByIdInput {
  @Field(() => Date, { nullable: true })
  start_at: Date;

  @Field(() => Date, { nullable: true })
  end_at: Date;
}
