import { ObjectType } from '@nestjs/graphql';
import { SummaryScore } from '@/global/graphql/types/summary-score.type';

@ObjectType()
export class ClinicSummaryScore extends SummaryScore {}
