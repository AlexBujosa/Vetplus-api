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
import { SignUpVerificationCode } from '../types/sign-up-verification-code.type';
import { SignUpMessage, SignUpResult } from '@/auth/constant/contants';
import { VerificationCodeInput } from '@/global/graphql/input/verification-code.input';
import { NotificationService } from '@/notification/notification.service';
@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly googleAuthService: GoogleAuthService,
    private readonly notificationService: NotificationService,
  ) {}

  @Mutation(() => SignUpResponse)
  @UsePipes(new YupValidationPipe(SignUpInputSchema))
  async signUp(
    @Args('verificationCodeInput') verificationCodeInput: VerificationCodeInput,
  ): Promise<SignUpResponse> {
    const { verificationCode, room } = verificationCodeInput;
    const { result, signUpInput } = await this.authService.verificationCode(
      verificationCode,
      room,
    );

    return result
      ? await this.authService.register(signUpInput)
      : { result: SignUpResult.FAILED, message: SignUpMessage.USER_FAILED };
  }

  @Mutation(() => SignUpVerificationCode)
  @UsePipes(new YupValidationPipe(SignUpInputSchema))
  async signUpVerificationCode(
    @Args('signUpInput') signUpInput: SignUpInput,
  ): Promise<SignUpVerificationCode> {
    const room = await this.notificationService.sendSignUpVerificationCode(
      signUpInput,
    );
    return { room };
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
      throw customException.FORBIDDEN(null);
    return this.googleAuthService.socialRegister(signUpInput);
  }
}
