import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class ScheduleAppointmentInput {
  @Field(() => String)
  id_veterinarian: string;

  @Field(() => String)
  id_clinicOwner: string;

  @Field(() => String)
  id_pet: string;

  @Field(() => [String, String])
  services: string | string[];

  @Field(() => String)
  id_clinic: string;

  @Field(() => Date)
  start_at: Date;

  @Field(() => Date, { nullable: true })
  end_at: Date;
}
