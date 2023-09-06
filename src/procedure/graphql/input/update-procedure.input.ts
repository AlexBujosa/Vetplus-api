import { InputType, Field } from '@nestjs/graphql';
import { AddProcedureInput } from './add-procedure.input';

@InputType()
export class UpdateProcedureInput extends AddProcedureInput {
  @Field(() => String)
  id: string;
}
