import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from '../../auth.service';
import { SignInInput } from '../inputs/sign-in.input';
import { SignUpResponse } from '../types/sign-up-result.type';
import { SignUpInput } from '../inputs/sign-up.input';
import { SignInResponse } from '../types/sign-in-result.type';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '@/auth/gql-auth.guard';

@Resolver(() => SignUpResponse)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => SignUpResponse)
  signUp(@Args('signUpInput') signUpInput: SignUpInput) {
    return this.authService.register(signUpInput);
  }

  @Query(() => SignInResponse)
  @UseGuards(GqlAuthGuard)
  signInWithEmail(
    @Args('signInInput') signInInput: SignInInput,
    @Context() context,
  ) {
    return this.authService.login(context.user);
  }
  /*
  @Query(() => SignUpResponse)
  socialLogin(@Args('signInAuthInput') signInAuthInput: SignInInput) {
    return this.authService.login(signInAuthInput);
  }*/
}
