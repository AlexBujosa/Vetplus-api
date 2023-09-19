import { ObjectType, Field } from '@nestjs/graphql';
import { ClinicUser } from './clinic-user.type';
import { GetAllClients } from './get-all-clients.type';

@ObjectType()
export class GetAllClientsResult extends ClinicUser {
  @Field(() => GetAllClients, { nullable: true })
  User: GetAllClients;
}
