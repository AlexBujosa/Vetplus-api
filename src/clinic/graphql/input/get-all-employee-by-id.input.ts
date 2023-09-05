import { InputType } from '@nestjs/graphql';
import { GetClinicByIdInput } from './get-clinic-by-id.input';

@InputType()
export class GetAllEmployeeByIdInput extends GetClinicByIdInput {}
