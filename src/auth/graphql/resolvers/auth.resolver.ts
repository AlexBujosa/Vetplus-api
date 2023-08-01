import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from '../../auth.service';
import { SignInInput } from '../inputs/sign-in.input';
import { Auth } from '../types/auth.type';
import { SignUpInput } from '../inputs/sign-up.input';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Auth)
  signUp(@Args('signUpInput') signUpInput: SignUpInput) {
    return this.authService.register(signUpInput);
  }

  @Query(() => [Auth])
  signInWithEmail(@Args('signInAuthInput') signInAuthInput: SignInInput) {
    return this.authService.login(signInAuthInput);
  }

  @Query(() => [Auth])
  socialLogin(@Args('signInAuthInput') signInAuthInput: SignInInput) {
    return this.authService.login(signInAuthInput);
  }
}
