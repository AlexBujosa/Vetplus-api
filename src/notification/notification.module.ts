import { Module } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { NotificationService } from './notification.service';
import { NotificationResolver } from './graphql/resolver/notification.resolver';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { AuthGateWay } from '@/auth/auth.gateway';
import { PubSubModule } from '@/pubsub/pubsub.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CacheModule.register({
      host: 'localhost',
      port: 6379,
    }),
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
    PubSubModule,
  ],
  providers: [
    NotificationService,
    NotificationResolver,
    PrismaService,
    AuthGateWay,
  ],
  exports: [NotificationService],
})
export class NotificationModule {}
