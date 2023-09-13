import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class AddProcedureInput {
  @Field(() => String)
  name: string;
}
