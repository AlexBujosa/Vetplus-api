import { Injectable } from '@nestjs/common';
import { BcryptService } from '@/bcrypt/bcrypt.service';
import { UserService } from '@/user/user.service';
import { SignUpInput } from './graphql/inputs/sign-up.input';
import { CredentialsService } from '@/credentials/credentials.service';
import { PrismaService } from '@/prisma/prisma.service';
import { SignUpMessage, SignUpResult } from './constant/contants';
import {
  signInCustomException,
  customException,
  signUpCustomException,
} from '@/global/constant/constants';
import { AuthProvider, User } from '@prisma/client';
import { SignInResponse } from './graphql/types/sign-in-result.type';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly provider: AuthProvider = 'EMAIL';
  constructor(
    private userService: UserService,
    private bcryptService: BcryptService,
    private credentialsService: CredentialsService,
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(signUpInput: SignUpInput) {
    const { COMPLETED } = SignUpResult;
    const { USER_CREATED } = SignUpMessage;

    const strongPassword = this.credentialsService.validatePassword(
      signUpInput.password,
    );
    if (!strongPassword) throw signUpCustomException.PASSWORD_WEAK();

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
      throw signInCustomException.WRONG_PROVIDER();

    const result = await this.credentialsService.findById(id);
    if (!result) throw customException.CREDENTIALS_NOT_FOUND();
    const { password: hash } = result;

    const coincidence = await this.bcryptService.decryptPassword(
      hash,
      password,
    );
    if (!coincidence) throw customException.INVALID_CREDENTIALS;
    return coincidence ? user : null;
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
