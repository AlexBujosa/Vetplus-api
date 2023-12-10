import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class AddDewormingInput {
  @Field(() => Date, { nullable: true })
  date: Date;

  @Field(() => String, { nullable: true })
  product: string;
}
