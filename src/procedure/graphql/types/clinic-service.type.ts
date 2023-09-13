import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class ClinicService {
  @Field(() => String)
  id_clinic: string;

  @Field(() => String)
  id_service: string;

  @Field()
  created_at: Date;

  @Field()
  updated_at: Date;

  @Field()
  status: boolean;
}
