import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class AppointmentSchedule {
  @Field(() => Date)
  start_at: Date;

  @Field(() => Date, { nullable: true })
  end_at: Date;
}

//comment xd
