import { Module } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { AuthGateWay } from '@/auth/auth.gateway';
import { PubSub } from 'graphql-subscriptions';
import { PubSubModule } from '@/pubsub/pubsub.module';
import { ReminderAppointment } from './reminder';
import { NotificationModule } from '@/notification/notification.module';
import { MessagingModule } from '@/message/messaging.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PubSubModule,
    NotificationModule,
    MessagingModule,
  ],
  providers: [ReminderAppointment],
  exports: [ReminderAppointment],
})
export class ReminderModule {}
