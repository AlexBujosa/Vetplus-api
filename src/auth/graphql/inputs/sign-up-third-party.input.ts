import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class SignUpThirdPartyInput {
  @Field(() => String)
  names: string;

  @Field(() => String)
  surnames: string;

  @Field(() => String)
  email: string;
}
