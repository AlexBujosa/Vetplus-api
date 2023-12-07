import { GenericByIdInput } from '@/global/graphql/input/generic-by-id.input';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class ReassignAppointmentToVeterinarianInput extends GenericByIdInput {
  @Field(() => String)
  id_veterinarian: string;
}
