import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class SignInThirdPartyInput {
  @Field(() => String)
  acesstoken: string;
}
