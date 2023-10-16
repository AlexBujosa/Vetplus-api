import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class StringArrayBox {
  @Field(() => [String])
  value: string[];
}
