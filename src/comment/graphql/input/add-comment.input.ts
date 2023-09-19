import { GenericByIdInput } from '@/global/graphql/input/generic-by-id.input';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class AddCommentInput extends GenericByIdInput {
  @Field(() => String)
  comment: string;
}
