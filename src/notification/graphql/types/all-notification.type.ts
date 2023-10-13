import { ObjectType, Field } from '@nestjs/graphql';
import { Notification } from './notification.type';
import { NotificationAD } from './notification-ad.type';
import { NotificationInvitation } from './notification-invitation.type';

@ObjectType()
export class AllNotification extends Notification {
  @Field(() => NotificationInvitation, { nullable: true })
  notificationInvitation: NotificationInvitation;

  @Field(() => NotificationAD, { nullable: true })
  notificationAD: NotificationAD;
}
