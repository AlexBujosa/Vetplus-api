import { GenericByIdInput } from '@/global/graphql/input/generic-by-id.input';
import { InputType, Field } from '@nestjs/graphql';
import { Role } from '@prisma/client';

@InputType()
export class UpdateUserRoleInput extends GenericByIdInput {
  @Field(() => String)
  role: Role;
}
