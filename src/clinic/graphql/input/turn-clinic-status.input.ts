import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class TurnClinicStatusInput {
  @Field(() => Boolean)
  status: boolean;
}
