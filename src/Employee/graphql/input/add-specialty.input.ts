import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AddSpecialtyInput {
  @Field(() => String, { nullable: true })
  specialties: string;
}
