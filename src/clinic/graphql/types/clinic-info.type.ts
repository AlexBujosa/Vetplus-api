import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class ClinicInfo {
  @Field(() => String)
  name: string;

  @Field(() => String)
  address: string;

  @Field(() => String, { nullable: true })
  image: string;
}
