import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateCredentialsInput {
  @Field(() => String)
  password: string;
}
