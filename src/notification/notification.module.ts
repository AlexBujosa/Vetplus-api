import { Module } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { NotificationService } from './notification.service';
import { NotificationResolver } from './graphql/resolver/notification.resolver';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: process.env.MAILER_USER,
          pass: process.env.MAILER_PASS,
        },
      },
    }),
  ],
  providers: [NotificationService, NotificationResolver, PrismaService],
  exports: [NotificationService],
})
export class NotificationModule {}
