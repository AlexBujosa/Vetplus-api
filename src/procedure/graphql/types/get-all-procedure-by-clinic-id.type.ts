import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class GetAllProcedureByClinicId {
  @Field(() => [String])
  services: string[];
}
