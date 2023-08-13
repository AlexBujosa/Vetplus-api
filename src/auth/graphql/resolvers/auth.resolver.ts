import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from '../../auth.service';
import { SignInInput } from '../inputs/sign-in.input';
import { SignUpResponse } from '../types/sign-up-result.type';
import { SignUpInput } from '../inputs/sign-up.input';
import { SignInResponse } from '../types/sign-in-result.type';
import { UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from '@/auth/guard/google-auth.guard';
import { GoogleAuthService } from '@/auth/google-auth/google-auth.service';
import { GqlAuthGuard } from '@/auth/guard/gql-auth.guard';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly googleAuthService: GoogleAuthService,
  ) {}

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

  @Query(() => SignInResponse)
  @UseGuards(GoogleAuthGuard)
  googleLogin(@Context() context) {
    return this.authService.login(context.req.user);
  }

  @Mutation(() => SignInResponse)
  @UseGuards(GoogleAuthGuard)
  googleRegister(@Args('signUpInput') signUpInput: SignUpInput) {
    return this.googleAuthService.socialRegister(signUpInput);
  }
}
