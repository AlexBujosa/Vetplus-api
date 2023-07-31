import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateCredentialsInput {
  @Field(() => String)
  id_user: string;
  @Field(() => String)
  password: string;
}
