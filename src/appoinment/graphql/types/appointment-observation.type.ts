import { ObjectType, Field } from '@nestjs/graphql';
import { Deworming } from '@/appoinment/graphql/types/deworming.type';
import { Vaccines } from '@/appoinment/graphql/types/vaccines.type';
import { ReproductiveTimeline } from '@/appoinment/graphql/types/reproductive-timeline.type';

@ObjectType()
export class AppointmentObservation {
  @Field(() => [String])
  suffering: string[];

  @Field(() => String)
  treatment: string;

  @Field(() => String)
  feed: string;

  @Field(() => Deworming, { nullable: true })
  deworming: Deworming;

  @Field(() => Vaccines, { nullable: true })
  vaccines: Vaccines;

  @Field(() => ReproductiveTimeline, { nullable: true })
  reproductiveTimeline: ReproductiveTimeline;
}
