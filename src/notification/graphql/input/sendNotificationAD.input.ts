import { GenericByIdInput } from '@/global/graphql/input/generic-by-id.input';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class SendNotificationADInput extends GenericByIdInput {
  @Field(() => String)
  id_pet: string;
}
