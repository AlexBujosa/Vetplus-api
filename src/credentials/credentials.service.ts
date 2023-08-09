import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateCredentialsInput } from './graphql/input/create-credentials.input';
import {
  customException,
  signUpCustomException,
} from '@/global/constant/constants';

@Injectable()
export class CredentialsService {
  constructor(private prisma: PrismaService) {}

  async create(createCredentialsInput: CreateCredentialsInput) {
    try {
      return await this.prisma.credentials.create({
        data: { ...createCredentialsInput },
      });
    } catch (error) {
      throw signUpCustomException.FAILED_CREATE_CREDENTIALS();
    }
  }

  async findById(id_user: string) {
    try {
      return await this.prisma.credentials.findUnique({
        where: {
          id_user,
        },
      });
    } catch (error) {
      throw customException.SOMETHING_WRONG_FIND_CREDENTIALS();
    }
  }

  validatePassword(password: string): boolean {
    const regexStr =
      '^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@#$%^&+=!¡?¿*()])(?!.*\\s).{12,}$';
    const regex = new RegExp(regexStr);

    return regex.test(password);
  }
}
