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
