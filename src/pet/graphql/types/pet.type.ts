import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Sex } from '@prisma/client';

@ObjectType()
export class Pet {
  @Field(() => String)
  id: string;

  @Field(() => String)
  id_owner: string;

  @Field(() => Int)
  id_specie: number;

  @Field(() => Int)
  id_breed: number;

  @Field(() => String)
  name: string;

  @Field({ nullable: true })
  image: string;

  @Field()
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
