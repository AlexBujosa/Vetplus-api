import { InputType, Field } from '@nestjs/graphql';
@InputType()
export class DeletePetImageInput {
  @Field(() => String)
  image: string;
}
