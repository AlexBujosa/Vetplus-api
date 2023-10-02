import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateCredentialsRecoveryAccountInput {
  @Field(() => String)
  password: string;
}

@InputType()
export class UpdateCredentialsInput {
  @Field(() => String)
  old_password: string;

  @Field(() => String)
  password: string;
}
