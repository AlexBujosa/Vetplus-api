import { ObjectType, Field } from '@nestjs/graphql';
import { Appointment } from './appointment.type';
import { Clinic } from '@/clinic/graphql/types/clinic.type';
import { Pet } from '@/pet/graphql/types/pet.type';
import { User } from '@/user/graphql/types/user.type';

@ObjectType()
export class AppointmentVerified extends Appointment {
  @Field(() => User, { nullable: true })
  Owner: User;
}
