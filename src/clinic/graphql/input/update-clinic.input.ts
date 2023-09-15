import { GenericByIdInput } from '@/global/graphql/input/generic-by-id.input';
import { InputType, Field } from '@nestjs/graphql';
import { ScheduleInput } from './schedule.input';
import { ScheduleType } from '@/clinic/constant';

@InputType()
export class UpdateClinicInput {
  @Field(() => String, { nullable: true })
  name: string;

  @Field(() => String, { nullable: true })
  telephone_number: string;

  @Field({ nullable: true })
  google_maps_url: string;

  @Field({ nullable: true })
  email: string;

  @Field({ nullable: true })
  image: string;

  @Field(() => ScheduleInput, { nullable: true })
  schedule: ScheduleType;

  @Field(() => String, { nullable: true })
  address: string;

  @Field(() => [String], { nullable: true })
  services: string[];
}
