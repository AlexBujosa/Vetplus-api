import {
  Args,
  Context,
  Mutation,
  Resolver,
  Query,
  Subscription,
} from '@nestjs/graphql';
import { Inject, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@/global/guard/jwt-auth.guard';
import { RolesGuard } from '@/global/guard/roles.guard';
import { Roles } from '@/global/decorator/roles.decorator';
import { Role } from '@prisma/client';
import { NotificationService } from '@/notification/notification.service';
import { Notification } from '../types/notification.type';
import { PubSub } from 'graphql-subscriptions';
import { MarkNotificationAsReadInput } from '../input/markNotificationAsRead.input';
import { NotificationResponse } from '../types/notification-response.type';
import { Status } from '@/global/constant/constants';
import { AllNotification } from '../types/all-notification.type';

@Resolver()
export class NotificationResolver {
  constructor(
    private readonly notificationService: NotificationService,
    @Inject('PUB_SUB') private readonly pubSub: PubSub,
  ) {}

  @Roles(Role.CLINIC_OWNER, Role.ADMIN, Role.PET_OWNER, Role.VETERINARIAN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Subscription((returns) => AllNotification)
  async getNewNotification(@Context() context) {
    return this.getNewNotification(context.req.user.sub);
  }

  @Roles(Role.CLINIC_OWNER, Role.ADMIN, Role.PET_OWNER, Role.VETERINARIAN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Query(() => [Notification])
  async getAllNotification(@Context() context): Promise<Notification[]> {
    return await this.notificationService.getAllNotification(
      context.req.user.sub,
    );
  }

  @Roles(Role.CLINIC_OWNER, Role.ADMIN, Role.PET_OWNER, Role.VETERINARIAN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Mutation(() => NotificationResponse)
  async markNotificationAsRead(
    @Args('markNotificationAsReadInput')
    markNotificationAsReadInput: MarkNotificationAsReadInput,
    @Context() context,
  ): Promise<NotificationResponse> {
    const result = await this.notificationService.markNotificationAsRead(
      markNotificationAsReadInput,
      context.req.user.sub,
    );

    return result ? { result: Status.COMPLETED } : { result: Status.FAILED };
  }
}
