import { ObjectType, Field } from '@nestjs/graphql';
import { User } from '@/user/graphql/types/user.type';
import { AppointmentSchedule } from '@/appoinment/graphql/types/appointment-schedule.type';
import { PetBreed } from '@/pet/graphql/types/pet-breed.type';

@ObjectType()
export class GetAllClients extends User {
  @Field(() => [PetBreed])
  Pet: PetBreed[];

  @Field(() => [AppointmentSchedule])
  AppointmentOwner: AppointmentSchedule[];
}
