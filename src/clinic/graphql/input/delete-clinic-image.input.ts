import { InputType, Field } from '@nestjs/graphql';
@InputType()
export class DeleteClinicImageInput {
  @Field(() => String)
  image: string;
}
