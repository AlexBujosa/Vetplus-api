import { InputType } from '@nestjs/graphql';
import { GenericByIdInput } from '@/global/graphql/input/generic-by-id.input';

@InputType()
export class GetAllEmployeeByIdInput extends GenericByIdInput {}
