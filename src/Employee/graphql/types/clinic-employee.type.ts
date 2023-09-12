import { ObjectType, Field } from '@nestjs/graphql';
import { EmployeeInvitationStatus } from '@prisma/client';

@ObjectType()
export class ClinicEmployee {
  @Field(() => String)
  id_clinic: string;

  @Field(() => String)
  id_employee: string;

  @Field(() => String)
  employee_invitation_status: EmployeeInvitationStatus;

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;

  @Field(() => Boolean)
  status: boolean;
}
