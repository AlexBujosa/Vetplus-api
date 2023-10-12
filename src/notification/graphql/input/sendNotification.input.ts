import { NotificationCategory } from '@/notification/constant';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class SendNotificationInput {
  @Field(() => String)
  id_user: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  subtitle: string;

  @Field(() => String)
  category: NotificationCategory;
}
