import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Vaccines {
  @Field(() => Date)
  date: Date;

  @Field(() => String)
  vaccineBrand: string;

  @Field(() => String)
  vaccineBatch: string;
}
