import { InputType, Field } from '@nestjs/graphql';
@InputType()
export class NonWorkingDaysInput {
  @Field(() => [String])
  nonWorkingDays: string[];
}
