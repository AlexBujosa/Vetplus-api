import { InputType, Field } from '@nestjs/graphql';
import { GenericByIdInput } from '@/global/graphql/input/generic-by-id.input';

@InputType()
export class TurnEmployeeStatusInput extends GenericByIdInput {
  @Field(() => String)
  id_employee: string;

  @Field(() => Boolean)
  status: boolean;
}
