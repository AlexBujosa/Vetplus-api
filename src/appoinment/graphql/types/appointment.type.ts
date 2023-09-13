import { ObjectType, Field } from '@nestjs/graphql';
import { AppointmentSchedule } from './appointment-schedule.type';

@ObjectType()
export class Appointment extends AppointmentSchedule {
  @Field(() => String)
  id: string;

  @Field(() => String)
  id_owner: string;

  @Field(() => String)
  id_veterinarian: string;

  @Field(() => String)
  id_pet: string;

  @Field(() => String)
  id_service: string;

  @Field(() => String)
  id_clinic: string;

  @Field(() => String, { nullable: true })
  observations: string;

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;

  @Field(() => Boolean)
  status: boolean;
}
