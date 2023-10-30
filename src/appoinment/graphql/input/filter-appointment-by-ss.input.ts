import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class FilterAppointmentBySSInput {
  @Field(() => String, { nullable: true })
  state: 'CANCELLED' | 'DELAYED' | 'FINISHED' | 'IN_PROGRESS' | 'PENDING';

  @Field(() => String, { nullable: true })
  appointment_status: 'ACCEPTED' | 'DENIED';
}
