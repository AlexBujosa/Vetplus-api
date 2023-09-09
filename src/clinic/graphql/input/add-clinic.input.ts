import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class AddClinicInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  telephone_number: string;

  @Field({ nullable: true })
  google_maps_url: string;

  @Field(() => String)
  address: string;
}