import { Injectable } from '@nestjs/common';
import { BcryptService } from '@/bcrypt/bcrypt.service';
import { SignInInput } from './graphql/inputs/sign-in.input';
import { UserService } from '@/user/user.service';
import { SignUpInput } from './graphql/inputs/sign-up.input';
import { CredentialsService } from '@/credentials/credentials.service';
import { PrismaService } from '@/prisma/prisma.service';
import { SignUpMessage, SignUpResult } from './constant/contants';
import {
  signInCustomException,
  customException,
} from '@/global/constant/constants';
import { AuthProvider, User } from '@prisma/client';
import { SignInResponse } from './graphql/types/sign-in-result.type';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
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
    await this.prismaService.$transaction(async () => {
      const hash = await this.bcryptService.hashPassword(signUpInput.password);
      const userCreated = await this.userService.create(signUpInput);
      const { id } = userCreated;
      const createCredentials = { id_user: id, password: hash };
      await this.credentialsService.create(createCredentials);
    });

    return { result: COMPLETED, message: USER_CREATED };
  }
  async validateUser(email: string, password: string): Promise<User> {
    console.log('antes de email not found');
    const user = await this.userService.findByEmail(email);
    const { id, provider } = user;
    console.log('despues de email not found');
    if (provider != AuthProvider.EMAIL)
      throw signInCustomException.WRONG_PROVIDER();

    const result = await this.credentialsService.findById(id);
    if (!result) throw customException.CREDENTIALS_NOT_FOUND();
    const { password: hash } = result;

    const coincidence = await this.bcryptService.decryptPassword(
      hash,
      password,
    );

    return coincidence ? user : null;
  }
  async login(user: User): Promise<SignInResponse> {
    return {
      access_token: await this.jwtService.sign({
        username: user.email,
        sub: user.id,
      }),
    };
  }
}
