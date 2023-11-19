import { UserFmc } from '@/appoinment/graphql/types/user-fmc.type';
import { User } from './user.type';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserProfile extends User {
  @Field(() => UserFmc, { nullable: true })
  User_Fmc: UserFmc;
}
