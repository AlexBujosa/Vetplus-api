import { ObjectType, Field } from '@nestjs/graphql';
import { Comments } from './comment.type';
import { CommentOwnerAppointment } from './comment-owner-appointment.type';

@ObjectType()
export class GetMyComment extends Comments {
  @Field(() => CommentOwnerAppointment)
  Owner: CommentOwnerAppointment;
}
