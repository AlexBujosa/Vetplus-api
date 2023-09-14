import { GenericByIdInput } from '@/global/graphql/input/generic-by-id.input';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateClinicInput extends GenericByIdInput {
  @Field(() => String, { nullable: true })
  name: string;

  @Field(() => String, { nullable: true })
  telephone_number: string;

  @Field({ nullable: true })
  google_maps_url: string;

  @Field({ nullable: true })
  image: string;

  @Field(() => String, { nullable: true })
  address: string;

  @Field(() => [String], { nullable: true })
  services: string[];
}
