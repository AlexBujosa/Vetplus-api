import { InputType, Field, Int } from '@nestjs/graphql';
import { Sex } from '@prisma/client';
import * as Upload from 'graphql-upload/Upload';
import * as GraphQLUpload from 'graphql-upload/graphqlUploadExpress';

@InputType()
export class AddPetInput {
  @Field(() => Int)
  id_specie: number;

  @Field(() => Int)
  id_breed: number;

  @Field(() => String)
  name: string;

  @Field(() => GraphQLUpload)
  image: Upload;

  @Field()
  gender: Sex;

  @Field(() => Boolean)
  castrated: boolean;

  @Field({ nullable: true })
  dob: Date;

  @Field({ nullable: true })
  observations: string;
}
