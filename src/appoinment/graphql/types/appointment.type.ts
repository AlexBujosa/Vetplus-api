import { ObjectType, Field } from '@nestjs/graphql';
import { AppointmentSchedule } from './appointment-schedule.type';
import { AppointmentObservation } from './appointment-observation.type';

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

  @Field(() => [String, String])
  services: string | string[];

  @Field(() => String)
  id_clinic: string;

  @Field(() => AppointmentObservation, { nullable: true })
  observations: AppointmentObservation;

  @Field(() => String, { nullable: true })
  appointment_status: 'ACCEPTED' | 'DENIED';

  @Field(() => String, { nullable: true })
  state: 'PENDING' | 'IN_PROGRESS' | 'FINISHED' | 'DELAYED' | 'CANCELLED';

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;

  @Field(() => Boolean)
  status: boolean;
}
