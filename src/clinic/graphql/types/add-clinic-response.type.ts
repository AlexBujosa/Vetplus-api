import { ClinicResult } from '@/clinic/constant';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class ClinicResponse {
  @Field()
  result: ClinicResult;
}
