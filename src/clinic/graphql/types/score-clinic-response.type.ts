import { ObjectType } from '@nestjs/graphql';
import { AddClinicResponse } from './add-clinic-response.type';

@ObjectType()
export class ScoreClinicResponse extends AddClinicResponse {}
