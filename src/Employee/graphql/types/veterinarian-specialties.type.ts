import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class VeterinarianSpecialties {
  @Field(() => String, { nullable: true })
  specialties: string;
}
