import { ObjectType, Field } from '@nestjs/graphql';
import { Appointment } from './appointment.type';
import { User } from '@/user/graphql/types/user.type';
import { UserFmc } from './user-fmc.type';

@ObjectType()
export class AppointmentUserFmc extends Appointment {
  @Field(() => AppointmentUser)
  Owner: AppointmentUser;
}

@ObjectType()
class AppointmentUser extends User {
  @Field(() => UserFmc, { nullable: true })
  User_Fmc: UserFmc;
}
