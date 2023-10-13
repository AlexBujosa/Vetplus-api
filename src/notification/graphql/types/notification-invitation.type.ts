import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class NotificationInvitation {
  @Field(() => String, { nullable: true })
  id: string;

  @Field(() => String, { nullable: true })
  id_owner: string;

  @Field(() => String, { nullable: true })
  id_clinic: string;
}
