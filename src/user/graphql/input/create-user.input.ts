import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  names: string;

  @Field(() => String)
  surnames: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;
}
