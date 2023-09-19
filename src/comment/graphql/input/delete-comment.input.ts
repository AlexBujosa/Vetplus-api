import { GenericByIdInput } from '@/global/graphql/input/generic-by-id.input';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class DeleteCommentInput extends GenericByIdInput {
  @Field(() => String)
  id_clinic: string;
}
