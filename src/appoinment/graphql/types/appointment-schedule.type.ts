import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class AppointmentSchedule {
  @Field(() => Date)
  start_at: Date;

  @Field(() => Date)
  end_at: Date;
}

//comment xd
