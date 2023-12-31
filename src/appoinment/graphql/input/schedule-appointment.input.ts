import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class ScheduleAppointmentInput {
  @Field(() => String)
  id_veterinarian: string;

  @Field(() => String)
  id_pet: string;

  @Field(() => [String, String])
  services: string | string[];

  @Field(() => String)
  id_clinic: string;

  @Field(() => Date)
  start_at: Date;

  @Field(() => Date)
  end_at: Date;
}
