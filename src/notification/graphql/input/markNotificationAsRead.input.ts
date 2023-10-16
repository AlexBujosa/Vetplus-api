import { GenericByIdInput } from '@/global/graphql/input/generic-by-id.input';
import { InputType } from '@nestjs/graphql';

@InputType()
export class MarkNotificationAsReadInput extends GenericByIdInput {}
