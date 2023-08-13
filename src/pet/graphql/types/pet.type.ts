import { ObjectType, Field } from '@nestjs/graphql';
import { Sex } from '@prisma/client';

@ObjectType()
export class Pet {
  @Field(() => String)
  id: string;

  @Field(() => String)
  id_owner: string;

  @Field(() => String)
  id_specie: string;

  @Field(() => String)
  id_breed: string;

  @Field(() => String)
  name: string;

  @Field({ nullable: true })
  image: string;

  @Field(() => Sex)
  gender: Sex;

  @Field(() => Boolean)
  castrated: boolean;

  @Field({ nullable: true })
  dob: Date;

  @Field({ nullable: true })
  observations: string;

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;

  @Field(() => Boolean)
  status: boolean;
}
