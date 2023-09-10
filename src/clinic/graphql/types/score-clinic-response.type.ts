import { ObjectType } from '@nestjs/graphql';
import { ClinicResponse } from './clinic-response.type';

@ObjectType()
export class ScoreClinicResponse extends ClinicResponse {}
