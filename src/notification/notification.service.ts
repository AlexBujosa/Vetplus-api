import { PrismaService } from '@/prisma/prisma.service';
import { MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable } from '@nestjs/common';
import { NotificationKind } from './constant';
import { generateRandomSixDigitNumber } from '@/global/constant/generate-random';
import { v4 as uuidv4 } from 'uuid';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { AuthGateWay } from '@/auth/auth.gateway';
import { SignUpInput } from '@/auth/graphql/inputs/sign-up.input';
import { Notification } from './graphql/types/notification.type';
import { PubSub } from 'graphql-subscriptions';
import { MarkNotificationAsReadInput } from './graphql/input/markNotificationAsRead.input';
import { SendNotificationInput } from './graphql/input/sendNotification.input';
import { OmitTx } from '@/Employee/constant';
import { customException } from '@/global/constant/constants';
import { SendNotificationInvitationInput } from './graphql/input/sendNotificationInvitation.input';
import { SendNotificationADInput } from './graphql/input/sendNotificationAD.input';
import { NotificationInvitation } from './graphql/types/notification-invitation.type';
import { NotificationAD } from './graphql/types/notification-ad.type';

@Injectable()
export class NotificationService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly mailerService: MailerService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly authGateWay: AuthGateWay,
    @Inject('PUB_SUB') private readonly pubSub: PubSub,
  ) {}

  sendMail(
    email: string,
    verificationCode: number,
    notificationKind: NotificationKind,
  ): void {
    this.mailerService.sendMail({
      from: process.env.MAIL_USER,
      to: email,
      subject: notificationKind,
      html: `<b>Welcome to vetplus app</b> <br/> <p>Verification Code here: ${verificationCode}</p>`,
    });
  }

  async sendPasswordRecoveryVerificationCode(email: string): Promise<string> {
    return this.processVerificationCode(
      email,
      NotificationKind.PASSWORD_RECOVERY,
    );
  }

  async sendSignUpVerificationCode(signUpInput: SignUpInput): Promise<string> {
    return this.processVerificationCode(
      signUpInput.email,
      NotificationKind.ACCOUNT_CREATION,
      signUpInput,
    );
  }

  private async processVerificationCode(
    email: string,
    kind: NotificationKind,
    additionalData?: SignUpInput,
  ): Promise<string> {
    const randomKey = uuidv4();
    const sixDigitNumberPassword = generateRandomSixDigitNumber();

    this.sendMail(email, sixDigitNumberPassword, kind);

    const data = additionalData
      ? {
          signUpInput: { ...additionalData },
          password: sixDigitNumberPassword,
        }
      : { email, password: sixDigitNumberPassword };

    await Promise.all([
      this.cacheManager.set(randomKey, data, 120000),
      this.authGateWay.emitTimeRemaining(randomKey, 120000),
    ]);

    return randomKey;
  }

  async saveNotification(
    sendNotificationInput: SendNotificationInput,
    tx?: OmitTx,
  ): Promise<Notification> {
    try {
      const data = { data: { ...sendNotificationInput } };
      const result = !tx
        ? await this.prismaService.notification.create({
            ...data,
          })
        : tx.notification.create({ ...data });
      return result;
    } catch (error) {
      throw customException.NOTIFICATION_FAILED(null);
    }
  }

  async saveNotificationInvitation(
    sendNotificationInvitation: SendNotificationInvitationInput,
    tx?: OmitTx,
  ): Promise<NotificationInvitation> {
    try {
      const data = { data: { ...sendNotificationInvitation } };
      const result = !tx
        ? await this.prismaService.notification_Invitation.create({
            ...data,
          })
        : tx.notification_Invitation.create({ ...data });
      return result;
    } catch (error) {
      throw customException.NOTIFICATION_FAILED(null);
    }
  }

  async saveNotificationAD(
    sendNotificationAD: SendNotificationADInput,
    tx?: OmitTx,
  ): Promise<NotificationAD> {
    try {
      const data = { data: { ...sendNotificationAD } };
      const result = !tx
        ? await this.prismaService.notification_AD.create({
            ...data,
          })
        : tx.notification_AD.create({ ...data });
      return result;
    } catch (error) {
      throw customException.NOTIFICATION_FAILED(null);
    }
  }

  async sendNotificationInvitationToUser(
    id_user: string,
    notification: Notification,
    notificationT: NotificationInvitation,
  ) {
    this.pubSub.publish(id_user, {
      getNewNotification: {
        ...notification,
        ...{
          notificationInvitation: { ...notificationT },
          notificationAD: null,
        },
      },
    });
  }

  async sendNotificationADToUser(
    id_user: string,
    notification: Notification,
    notificationT: NotificationAD,
  ) {
    this.pubSub.publish(id_user, {
      getNewNotification: {
        ...notification,
        ...{
          notificationAD: { ...notificationT },
          notificationInvitation: null,
        },
      },
    });
  }

  async sendNotificationToUser(id_user: string, notification: Notification) {
    this.pubSub.publish(id_user, {
      getNewNotification: { ...notification },
    });
  }

  async getAllNotification(id_user: string): Promise<Notification[]> {
    return await this.prismaService.notification.findMany({
      include: {
        Notification_Invitation: true,
        Notification_AD: true,
      },
      where: {
        id_user,
        read: false,
      },
    });
  }

  async markNotificationAsRead(
    markNotificationAsReadInput: MarkNotificationAsReadInput,
    id_user: string,
  ): Promise<boolean> {
    const { id } = markNotificationAsReadInput;
    const result = await this.prismaService.notification.update({
      data: {
        read: true,
      },
      where: {
        id,
        id_user,
      },
    });

    return result ? true : false;
  }
}
