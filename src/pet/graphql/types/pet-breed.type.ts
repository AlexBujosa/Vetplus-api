import { ObjectType, Field } from '@nestjs/graphql';
import { Pet } from './pet.type';
import { Breed } from '@/breed/graphql/types/breed.type';

@ObjectType()
export class PetBreed extends Pet {
  @Field(() => Breed)
  Breed: Breed;
}
