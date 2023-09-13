import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class AddSpecieInput {
  @Field(() => String)
  name: string;
}
