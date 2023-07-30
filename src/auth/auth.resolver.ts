import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { CreatePersonInput as RegisterInput } from '@/person/dto/create-person.input';
import { SignInInput } from './dto/sign-in.input';
import { Auth } from './entities/auth.entity';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Auth)
  signUp(@Args('registerAuthInput') registerAuthInput: RegisterInput) {
    return this.authService.register(registerAuthInput);
  }

  @Mutation(() => [Auth])
  signIn(@Args('signInAuthInput') signInAuthInput: SignInInput) {
    return this.authService.login(signInAuthInput);
  }
}
