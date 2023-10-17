import { GenericByIdInput } from '@/global/graphql/input/generic-by-id.input';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class FilterAppointmentByIdInput extends GenericByIdInput {
  @Field(() => String, { nullable: true })
  state: 'CANCELLED' | 'DELAYED' | 'FINISHED' | 'IN_PROGRESS' | 'PENDING';
}
