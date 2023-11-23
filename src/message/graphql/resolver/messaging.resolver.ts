import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Inject, UseGuards } from '@nestjs/common';
import { MessagingService } from '@/message/messaging.service';
import { MessageInput } from '@/message/graphql/input/message.input';
import { GeneralResponse } from '@/global/graphql/types/general-response.type';
import { Status } from '@/global/constant/constants';

@Resolver()
export class MessagingResolver {
  constructor(private readonly messagingService: MessagingService) {}

  @Mutation(() => GeneralResponse)
  async sendMessage(
    @Args('messageInput')
    messageInput: MessageInput,
  ): Promise<GeneralResponse> {
    const { body, token } = messageInput;
    await this.messagingService.sendMessage(token, body);
    return { result: Status.COMPLETED };
  }
}
