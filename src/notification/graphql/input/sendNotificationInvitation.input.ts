import { GenericByIdInput } from '@/global/graphql/input/generic-by-id.input';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class SendNotificationInvitationInput extends GenericByIdInput {
  @Field(() => String)
  id_owner: string;

  @Field(() => String)
  id_clinic: string;
}
