import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateUserInput } from './create-user.input';

@InputType()
export class UpdatePersonInput extends PartialType(CreateUserInput) {
  @Field(() => Int)
  id: number;
}
