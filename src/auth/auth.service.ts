import { Inject, Injectable, forwardRef } from '@nestjs/common';
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
import { AuthGateWay } from '@/auth/auth.gateway';
import { NotificationService } from '@/notification/notification.service';

@Injectable()
export class AuthService {
  private readonly provider: AuthProvider = 'EMAIL';
  constructor(
    private userService: UserService,
    private bcryptService: BcryptService,
    @Inject(forwardRef(() => CredentialsService))
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

    const coincidence = await this.bcryptService.comparePassword(
      hash,
      password,
    );
    if (!coincidence) throw customException.INVALID_CREDENTIALS(null);
    return coincidence ? user : null;
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
    return { signUpInput: result.signUpInput, result: true };
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
  recoveryAccount(user: User): SignInResponse {
    return {
      access_token: this.jwtService.sign(
        {
          username: user.email,
          sub: user.id,
          role: user.role,
          password: true,
        },
        { expiresIn: '5m' },
      ),
    };
  }
}
