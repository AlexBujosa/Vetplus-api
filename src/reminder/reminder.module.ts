import { Module } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { AuthGateWay } from '@/auth/auth.gateway';
import { PubSub } from 'graphql-subscriptions';
import { PubSubModule } from '@/pubsub/pubsub.module';
import { ReminderAppointment } from './reminder';
import { Messaging } from '@/message/message';
import { NotificationModule } from '@/notification/notification.module';

@Module({
  imports: [ConfigModule.forRoot(), PubSubModule, NotificationModule],
  providers: [ReminderAppointment, Messaging],
  exports: [ReminderAppointment],
})
export class ReminderModule {}
