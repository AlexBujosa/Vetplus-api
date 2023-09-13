import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from '../../auth.service';
import { SignInInput } from '../inputs/sign-in.input';
import { SignUpResponse } from '../types/sign-up-result.type';
import { SignUpInput } from '../inputs/sign-up.input';
import { SignInResponse } from '../types/sign-in-result.type';
import { UseGuards, UsePipes } from '@nestjs/common';
import { GoogleAuthGuard } from '@/auth/guard/google-auth.guard';
import { GoogleAuthService } from '@/auth/google-auth/google-auth.service';
import { GqlAuthGuard } from '@/auth/guard/gql-auth.guard';
import { customException } from '@/global/constant/constants';
import { YupValidationPipe } from '@/global/pipe/yup-validation.pipe';
import { SignUpInputSchema } from '@/global/schema/sign-up-input.schema';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly googleAuthService: GoogleAuthService,
  ) {}

  @Mutation(() => SignUpResponse)
  @UsePipes(new YupValidationPipe(SignUpInputSchema))
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
  @UsePipes(new YupValidationPipe(SignUpInputSchema))
  googleRegister(
    @Args('signUpInput') signUpInput: SignUpInput,
    @Context() context,
  ) {
    if (context.req.user.email != signUpInput.email)
      throw customException.FORBIDDEN();
    return this.googleAuthService.socialRegister(signUpInput);
  }
}
