import { NotificationCategory } from '@/notification/constant';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Notification {
  @Field(() => String)
  id: string;

  @Field(() => String)
  id_user: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  subtitle: string;

  @Field(() => String)
  category: NotificationCategory;

  @Field(() => Boolean)
  read: boolean;

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;

  @Field(() => Boolean)
  status: boolean;

  @Field(() => String)
  id_entity: string;
}
