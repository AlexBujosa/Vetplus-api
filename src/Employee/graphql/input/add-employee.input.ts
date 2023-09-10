import { InputType, Field } from '@nestjs/graphql';
import { GenericByIdInput } from '@/global/graphql/input/generic-by-id.input';
import { EmployeeInvitationStatus } from '@prisma/client';

@InputType()
export class AddEmployeeInput extends GenericByIdInput {
  @Field(() => String)
  id_employee: string;

  @Field({ nullable: true })
  employee_invitation_status: EmployeeInvitationStatus;
}
