import { InputType, Field } from '@nestjs/graphql';
import { GetClinicByIdInput } from './get-clinic-by-id.input';

@InputType()
export class TurnEmployeeStatusInput extends GetClinicByIdInput {
  @Field(() => String)
  id_employee: string;

  @Field(() => Boolean)
  status: boolean;
}
