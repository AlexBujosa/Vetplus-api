import { ObjectType, Field, Int } from '@nestjs/graphql';
import { ClinicInfo } from './clinic-info.type';

@ObjectType()
export class FavoriteClinicResult {
  @Field(() => ClinicInfo)
  Clinic: ClinicInfo;

  @Field(() => String)
  id_user: string;

  @Field(() => String)
  id_clinic: string;

  @Field(() => Boolean)
  favorite: boolean;

  @Field(() => Int, { nullable: true })
  points: number;
}
