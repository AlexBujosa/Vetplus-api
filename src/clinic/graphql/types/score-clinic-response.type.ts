import { ObjectType } from '@nestjs/graphql';
import { ClinicResponse } from './add-clinic-response.type';

@ObjectType()
export class ScoreClinicResponse extends ClinicResponse {}
