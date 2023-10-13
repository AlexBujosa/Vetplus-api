import { createUnionType } from '@nestjs/graphql';
import { NotificationAD } from '../graphql/types/notification-ad.type';
import { NotificationInvitation } from '../graphql/types/notification-invitation.type';

export enum NotificationKind {
  ACCOUNT_CREATION = 'Verification code to create account in vetplus',
  PASSWORD_RECOVERY = 'Verification code to get access again to your vetplus account',
  //ALERT_NEXT_APPOINTMENT = 'ALERT_NEXT_APPOINTMENT',
}

export type NotificationCategory =
  | 'APPOINTMENT'
  | 'HISTORY_ACCESS'
  | 'AUTHENTICATION'
  | 'INVITE_TO_CLINIC';

export const NotificationT = createUnionType({
  name: 'NotificationTUnion',
  types: () => [NotificationAD, NotificationInvitation] as const,
});
