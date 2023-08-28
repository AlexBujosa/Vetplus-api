import { InputType, Field } from '@nestjs/graphql';
@InputType()
export class DeleteUserImageInput {
  @Field(() => String)
  image: string;
}
