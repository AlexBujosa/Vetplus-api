import { Module } from '@nestjs/common';
import { MessagingService } from '@/message/messaging.service';
import { MessagingResolver } from '@/message/graphql/resolver/messaging.resolver';
@Module({
  imports: [],
  providers: [MessagingService, MessagingResolver],
  exports: [MessagingService],
})
export class MessagingModule {}
