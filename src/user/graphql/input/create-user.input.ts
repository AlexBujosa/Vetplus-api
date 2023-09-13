import { InputType, Field } from '@nestjs/graphql';
import { AuthProvider } from '@prisma/client';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  names: string;

  @Field({ nullable: true })
  surnames: string;

  @Field(() => String)
  email: string;

  @Field({ nullable: true })
  password: string;

  @Field({ nullable: true })
  provider: AuthProvider;
}
