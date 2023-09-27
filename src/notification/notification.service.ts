import { PrismaService } from '@/prisma/prisma.service';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { NotificationKind } from './constant';

@Injectable()
export class NotificationService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly mailerService: MailerService,
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
}
