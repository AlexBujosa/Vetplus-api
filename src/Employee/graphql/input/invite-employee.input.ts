import { InputType, Field } from '@nestjs/graphql';
import { GenericByIdInput } from '@/global/graphql/input/generic-by-id.input';
@InputType()
export class InviteToClinicInput extends GenericByIdInput {
  @Field(() => String)
  email: string;

  @Field({ nullable: true })
  employee_invitation_status: 'PENDING' | 'CANCELED';
}
