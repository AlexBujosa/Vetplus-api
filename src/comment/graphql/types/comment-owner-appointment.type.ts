import { ObjectType, Field } from '@nestjs/graphql';
import { CommentOwner } from './comment-owner.type';
import { AppointmentSchedule } from '@/appoinment/graphql/types/appointment-schedule.type';

@ObjectType()
export class CommentOwnerAppointment extends CommentOwner {
  @Field(() => [AppointmentSchedule], { nullable: true })
  AppointmentOwner: AppointmentSchedule;
}
