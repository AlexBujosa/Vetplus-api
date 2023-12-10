import { InputType, Field } from '@nestjs/graphql';
import { AddDewormingInput } from '@/appoinment/graphql/input/add-deworming.input';
import { AddVaccinesInput } from './add-vaccines.input';
import { AddReproductiveTimelineInput } from './add-reproductiveTimeline-input';

@InputType()
export class AddObservationsInput {
  @Field(() => [String])
  suffering: string[];

  @Field(() => String)
  treatment: string;

  @Field(() => String)
  feed: string;

  @Field(() => AddDewormingInput, { nullable: true })
  deworming: AddDewormingInput;

  @Field(() => AddVaccinesInput, { nullable: true })
  vaccines: AddVaccinesInput;

  @Field(() => AddReproductiveTimelineInput, { nullable: true })
  reproductiveTimeline: AddReproductiveTimelineInput;
}
