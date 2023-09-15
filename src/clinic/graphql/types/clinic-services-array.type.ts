import { ObjectType, Field } from '@nestjs/graphql';
import { Clinic } from './clinic.type';
@ObjectType()
export class ClinicServiceArray extends Clinic {
  @Field(() => [String], { nullable: true })
  services: string[];
}
