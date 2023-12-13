import { ObjectType, Field } from '@nestjs/graphql';
import { Deworming } from '@/appoinment/graphql/types/deworming.type';
import { Vaccines } from '@/appoinment/graphql/types/vaccines.type';
import { ReproductiveTimeline } from '@/appoinment/graphql/types/reproductive-timeline.type';

@ObjectType()
export class AppointmentObservation {
  @Field(() => [String], { nullable: true })
  suffering: string[];

  @Field(() => String, { nullable: true })
  treatment: string;

  @Field(() => String, { nullable: true })
  feed: string;

  @Field(() => Deworming, { nullable: true })
  deworming: Deworming;

  @Field(() => Vaccines, { nullable: true })
  vaccines: Vaccines;

  @Field(() => ReproductiveTimeline, { nullable: true })
  reproductiveTimeline: ReproductiveTimeline;
}
