import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class StringBox {
  @Field(() => String)
  value: string;
}
