import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class RegisterFmcInput {
  @Field(() => String)
  token_fmc: string;
}
