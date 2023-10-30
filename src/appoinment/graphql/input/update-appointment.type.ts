import { GenericByIdInput } from '@/global/graphql/input/generic-by-id.input';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateAppointmentInput extends GenericByIdInput {
  @Field(() => String, { nullable: true })
  appointment_status: 'ACCEPTED' | 'DENIED';

  @Field(() => Date, { nullable: true })
  end_at: Date;
}
