import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class NotificationAD {
  @Field(() => String, { nullable: true })
  id: string;

  @Field(() => String, { nullable: true })
  id_pet: string;
}
