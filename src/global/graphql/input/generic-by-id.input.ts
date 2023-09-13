import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class GenericByIdInput {
  @Field(() => String)
  id: string;
}
