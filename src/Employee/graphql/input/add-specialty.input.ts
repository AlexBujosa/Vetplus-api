import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AddSpecialtyInput {
  @Field(() => String)
  specialties: string;
}
