import { CreateUserInput } from '@/user/graphql/input/create-user.input';
import { InputType } from '@nestjs/graphql';

@InputType()
export class SignUpInput extends CreateUserInput {}
