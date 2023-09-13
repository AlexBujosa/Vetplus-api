import { ObjectType, Field } from '@nestjs/graphql';
import { Procedure } from './procedure.type';
import { ClinicService } from './clinic-service.type';

@ObjectType()
export class GetAllProcedureByClinicId extends ClinicService {
  @Field(() => Procedure)
  service: Procedure;
}
