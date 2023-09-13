import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class GetClinicByIdInput {
  @Field(() => String)
  id: string;
}
