import { ObjectType, Field } from '@nestjs/graphql';
import { Service } from './service.type';

@ObjectType()
export class ClinicServiceResult {
  @Field(() => Service)
  service: Service;

  @Field(() => String)
  id_clinic: string;

  @Field(() => String)
  id_service: string;

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;

  @Field(() => Boolean)
  status: boolean;
}
