import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class RecoveryCredentialsInput {
  @Field(() => String)
  email: string;
}
