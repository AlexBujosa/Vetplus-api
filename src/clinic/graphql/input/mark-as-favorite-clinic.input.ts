import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class MarkAsFavoriteClinicInput {
  @Field(() => String)
  id: string;

  @Field(() => Boolean)
  favorite: boolean;
}
