import { ClinicResult } from '@/clinic/constant';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class AddClinicResponse {
  @Field()
  result: ClinicResult;
}
