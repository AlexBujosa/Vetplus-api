import { ObjectType, Field } from '@nestjs/graphql';
import { UserClinicPoint } from './user-clinic-point.type';

@ObjectType()
export class CommentOwner {
  @Field(() => String)
  names: string;

  @Field(() => String, { nullable: true })
  surnames: string;

  @Field(() => String, { nullable: true })
  image: string;

  @Field(() => [UserClinicPoint], { nullable: true })
  ClinicUsers: UserClinicPoint[];
}
