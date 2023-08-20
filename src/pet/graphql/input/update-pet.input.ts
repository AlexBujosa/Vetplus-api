import { InputType, Field, Int } from '@nestjs/graphql';
import { Sex } from '@prisma/client';

@InputType()
export class UpdatePetInput {
  @Field(() => String)
  id: string;

  @Field(() => Int)
  id_specie: number;

  @Field(() => Int)
  id_breed: number;

  @Field(() => String)
  name: string;

  @Field({ nullable: true })
  url_current_image: string;

  @Field({ nullable: true })
  url_new_image: string;

  @Field()
  gender: Sex;

  @Field(() => Boolean)
  castrated: boolean;

  @Field({ nullable: true })
  dob: Date;

  @Field({ nullable: true })
  observations: string;
}
