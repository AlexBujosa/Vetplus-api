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

@Injectable()
export class NotificationService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly mailerService: MailerService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly authGateWay: AuthGateWay,
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
      ? { ...additionalData, password: sixDigitNumberPassword }
      : { email, password: sixDigitNumberPassword };

    await Promise.all([
      this.cacheManager.set(randomKey, data, 120000),
      this.authGateWay.emitTimeRemaining(randomKey, 120000),
    ]);

    return randomKey;
  }
}
