import { firebaseInitializeApp } from '@/reminder/common/config/firebase-sdk.config';
import { reminderTitle } from '@/reminder/common/reminder/common/constant';
import { Injectable } from '@nestjs/common';

import { getMessaging } from 'firebase-admin/messaging';

process.env.GOOGLE_APPLICATION_CREDENTIALS;

firebaseInitializeApp;

@Injectable()
export class MessagingService {
  async sendMessage(token_fmc: string, body: string): Promise<boolean> {
    const message = {
      notification: {
        title: reminderTitle,
        body: body,
      },
      token: token_fmc,
    };

    const result = await getMessaging().send(message);

    return result ? true : false;
  }
}
