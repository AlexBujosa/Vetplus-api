import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Clinic {
  @Field(() => String)
  id: string;

  @Field(() => String)
  id_owner: string;

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

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;

  @Field(() => Boolean)
  status: boolean;
}
