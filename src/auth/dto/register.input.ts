import { CreatePersonInput } from '@/person/dto/create-person.input';
import { InputType } from '@nestjs/graphql';

@InputType()
export class RegisterInput extends CreatePersonInput {}
