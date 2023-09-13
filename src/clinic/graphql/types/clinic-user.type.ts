import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class ClinicUser {
  @Field(() => String)
  id_user: string;

  @Field(() => String)
  id_clinic: string;

  @Field(() => Boolean)
  favorite: boolean;

  @Field(() => Int, { nullable: true })
  points: number;

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;

  @Field(() => Boolean)
  status: boolean;
}
