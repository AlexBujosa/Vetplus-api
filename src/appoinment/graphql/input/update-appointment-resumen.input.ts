import { GenericByIdInput } from '@/global/graphql/input/generic-by-id.input';
import { InputType, Field } from '@nestjs/graphql';
import { AddObservationsInput } from './add-observations.input';

@InputType()
export class UpdateAppointmentResumenInput extends GenericByIdInput {
  @Field(() => String)
  id_clinic: string;

  @Field(() => String)
  id_owner: string;

  @Field(() => AddObservationsInput, { nullable: true })
  observations: AddObservationsInput;
}
