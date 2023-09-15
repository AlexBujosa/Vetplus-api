import { SummaryScore } from '@/global/graphql/types/summary-score.type';
import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class VeterinarianSummaryScore extends SummaryScore {}
