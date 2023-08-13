import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class DeletePetInput {
  @Field(() => String)
  id: string;

  @Field(() => Boolean)
  status: boolean;
}
