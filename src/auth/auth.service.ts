import { Inject, Injectable } from '@nestjs/common';
import { BcryptService } from '@/bcrypt/bcrypt.service';
import { UserService } from '@/user/user.service';
import { SignUpInput } from './graphql/inputs/sign-up.input';
import { CredentialsService } from '@/credentials/credentials.service';
import { PrismaService } from '@/prisma/prisma.service';
import {
  SignUpMessage,
  SignUpResult,
  SignUpVerificationCodeType,
  SignUpVerificationResult,
} from './constant/contants';
import {
  signInCustomException,
  customException,
  signUpCustomException,
} from '@/global/constant/constants';
import { AuthProvider, User } from '@prisma/client';
import { SignInResponse } from './graphql/types/sign-in-result.type';
import { JwtService } from '@nestjs/jwt';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { v4 as uuidv4 } from 'uuid';
import { AuthGateWay } from '@/auth/auth.gateway';
import { generateRandomSixDigitNumber } from './constant/generate-random';
import { NotificationService } from '@/notification/notification.service';
import { NotificationKind } from '@/notification/constant';

@Injectable()
export class AuthService {
  private readonly provider: AuthProvider = 'EMAIL';
  constructor(
    private userService: UserService,
    private bcryptService: BcryptService,
    private credentialsService: CredentialsService,
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private readonly authGateWay: AuthGateWay,
    private readonly notificationService: NotificationService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async register(signUpInput: SignUpInput) {
    const { COMPLETED } = SignUpResult;
    const { USER_CREATED } = SignUpMessage;

    const strongPassword = this.credentialsService.validatePassword(
      signUpInput.password,
    );
    if (!strongPassword) throw signUpCustomException.PASSWORD_WEAK(null);

    await this.prismaService.$transaction(async () => {
      const hash = await this.bcryptService.hashPassword(signUpInput.password);
      signUpInput.provider = this.provider;
      const userCreated = await this.userService.create(signUpInput);
      const { id } = userCreated;
      const createCredentials = { id_user: id, password: hash };
      await this.credentialsService.create(createCredentials);
    });

    return { result: COMPLETED, message: USER_CREATED };
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findByEmail(email);
    const { id, provider } = user;
    if (provider != AuthProvider.EMAIL)
      throw signInCustomException.WRONG_PROVIDER(null);

    const result = await this.credentialsService.findById(id);
    if (!result) throw customException.CREDENTIALS_NOT_FOUND(null);
    const { password: hash } = result;

    const coincidence = await this.bcryptService.decryptPassword(
      hash,
      password,
    );
    if (!coincidence) throw customException.INVALID_CREDENTIALS;
    return coincidence ? user : null;
  }

  async signUpVerificationCode(signUpInput: SignUpInput): Promise<string> {
    const randomKey = uuidv4();

    const sixDigitNumberPassword = generateRandomSixDigitNumber();

    this.notificationService.sendMail(
      signUpInput.email,
      sixDigitNumberPassword,
      NotificationKind.ACCOUNT_CREATION,
    );

    await this.cacheManager.set(
      randomKey,
      { signUpValue: signUpInput, password: sixDigitNumberPassword },
      90000,
    );

    await this.authGateWay.emitTimeRemaining(randomKey, 90000);
    return randomKey;
  }

  async verificationCode(
    verificationCode: number,
    room: string,
  ): Promise<SignUpVerificationResult> {
    const result: SignUpVerificationCodeType = await this.cacheManager.get(
      room,
    );

    if (!result) return { signUpInput: null, result: false };

    if (result.password != verificationCode)
      return { signUpInput: null, result: false };
    return { signUpInput: result.signUpValue, result: true };
  }

  login(user: User): SignInResponse {
    return {
      access_token: this.jwtService.sign({
        username: user.email,
        sub: user.id,
        role: user.role,
      }),
    };
  }
}
