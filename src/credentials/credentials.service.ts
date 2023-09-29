import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateCredentialsInput } from './graphql/input/create-credentials.input';
import {
  customException,
  signUpCustomException,
} from '@/global/constant/constants';
import { NotificationService } from '@/notification/notification.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { AuthGateWay } from '@/auth/auth.gateway';
import { RecoveryAccount } from './constant';
import { AuthService } from '@/auth/auth.service';
import { UserService } from '@/user/user.service';
import { UpdateCredentialsInput } from './graphql/input/update-credentials.input';

@Injectable()
export class CredentialsService {
  constructor(
    private prisma: PrismaService,
    private readonly notificationService: NotificationService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly authGateWay: AuthGateWay,
    private readonly userService: UserService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  async create(createCredentialsInput: CreateCredentialsInput) {
    try {
      return await this.prisma.credentials.create({
        data: { ...createCredentialsInput },
      });
    } catch (error) {
      throw signUpCustomException.FAILED_CREATE_CREDENTIALS(null);
    }
  }

  async updateCredentials(
    updateCredentialsInput: UpdateCredentialsInput,
    id_user: string,
  ): Promise<boolean> {
    const { password } = updateCredentialsInput;
    const passwordUpdated = await this.prisma.credentials.update({
      data: {
        password,
      },
      where: {
        id_user,
      },
    });
    return passwordUpdated ? true : false;
  }

  async findById(id_user: string) {
    try {
      return await this.prisma.credentials.findUnique({
        where: {
          id_user,
        },
      });
    } catch (error) {
      throw customException.SOMETHING_WRONG_FIND_CREDENTIALS(null);
    }
  }

  async verificationCode(
    verificationCode: number,
    room: string,
  ): Promise<RecoveryAccount> {
    const result: { email: string; password: number } =
      await this.cacheManager.get(room);

    if (!result || result?.password != verificationCode)
      return { access_token: null };
    const user = await this.userService.findByEmail(result.email);
    const { access_token } = this.authService.login(user);

    return { access_token };
  }

  validatePassword(password: string): boolean {
    const regexStr =
      '^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@#$%^&+=!¡?¿*()])(?!.*\\s).{12,}$';
    const regex = new RegExp(regexStr);

    return regex.test(password);
  }
}
