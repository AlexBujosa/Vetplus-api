import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class AddClinicInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  telephone_number: string;

  @Field({ nullable: true })
  google_maps_url: string;

  @Field({ nullable: true })
  email: string;

  @Field({ nullable: true })
  image: string;

  @Field(() => String)
  address: string;
}
