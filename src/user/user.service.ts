import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateUserInput } from './graphql/input/create-user.input';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import {
  customException,
  signUpCustomException,
} from '../global/constant/constants';
import { User } from './graphql/types/user.type';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
    try {
      const { email, names, surnames, provider } = createUserInput;
      const createUser = { email, names, surnames, provider };
      return await this.prismaService.user.create({
        data: {
          ...createUser,
        },
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code == 'P2002'
      ) {
        throw signUpCustomException.EMAIL_ALREADY_EXIST();
      } else {
        throw signUpCustomException.TRANSACTION_FAILED();
      }
    }
  }

  async findByEmail(email: string): Promise<User> {
    const result = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (!result) throw customException.EMAIL_NOT_FOUND();

    return result;
  }

  async findById(id: string) {
    return await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });
  }

  async findAll() {
    return await this.prismaService.user.findMany();
  }
}
