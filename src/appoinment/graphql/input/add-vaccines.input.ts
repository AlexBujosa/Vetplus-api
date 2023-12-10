import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class AddVaccinesInput {
  @Field(() => Date, { nullable: true })
  date: Date;

  @Field(() => String, { nullable: true })
  vaccineBrand: string;

  @Field(() => String, { nullable: true })
  vaccineBatch: string;
}
