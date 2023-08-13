import { InputType, Field } from '@nestjs/graphql';
import { Sex } from '@prisma/client';

@InputType()
export class UpdatePetInput {
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
}
