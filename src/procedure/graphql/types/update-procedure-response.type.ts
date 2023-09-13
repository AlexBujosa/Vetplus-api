import { ObjectType } from '@nestjs/graphql';
import { AddProcedureResponse } from './add-procedure-response.type';

@ObjectType()
export class UpdateProcedureResponse extends AddProcedureResponse {}
