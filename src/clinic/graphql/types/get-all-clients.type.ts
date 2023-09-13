import { ObjectType, Field } from '@nestjs/graphql';
import { User } from '@/user/graphql/types/user.type';
import { Pet } from '@/pet/graphql/types/pet.type';
import { AppointmentSchedule } from '@/appoinment/graphql/types/appointment-schedule.type';

@ObjectType()
export class GetAllClients extends User {
  @Field(() => [Pet])
  Pet: Pet[];

  @Field(() => [AppointmentSchedule])
  AppointmentOwner: AppointmentSchedule[];
}
