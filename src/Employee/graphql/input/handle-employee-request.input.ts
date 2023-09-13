import { InputType, Field } from '@nestjs/graphql';
import { GenericByIdInput } from '@/global/graphql/input/generic-by-id.input';

@InputType()
export class HandleEmployeeRequestInput extends GenericByIdInput {
  @Field(() => String)
  employee_invitation_status: 'ACCEPTED' | 'DECLINED';
}
