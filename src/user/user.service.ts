import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateUserInput } from './graphql/input/create-user.input';
import { CredentialsService } from '@/credentials/credentials.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import {
  CreateUserResult,
  CreationStatus,
  CustomErrorResult,
} from './constant/constants';
import { CreatedUserResponse } from './graphql/types/created-user-response.type';

@Injectable()
export class UserService {
  constructor(
    private prismaService: PrismaService,
    private credentialsService: CredentialsService,
  ) {}

  async create(createUserInput: CreateUserInput): Promise<CreatedUserResponse> {
    const { FAILED, COMPLETED } = CreateUserResult;
    const { USER_CREATED } = CreationStatus;
    try {
      await this.prismaService.$transaction(async (tx) => {
        const { email, password, names, surnames } = createUserInput;
        const createUser = { email, names, surnames };
        const userCreated = await tx.user.create({
          data: {
            ...createUser,
          },
        });
        const { id } = userCreated;

        const createCredentials = { id_user: id, password };
        await this.credentialsService.create(createCredentials);
      });

      return {
        result: COMPLETED,
        message: USER_CREATED,
      };
    } catch (error) {
      const {
        EMAIL_ALREADY_EXIST,
        FAILED_CREATE_CREDENTIALS,
        TRANSACTION_FAILED,
      } = CustomErrorResult;

      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code == 'P2002'
      ) {
        return {
          result: FAILED,
          message: EMAIL_ALREADY_EXIST,
        };
      } else if (error.message == FAILED_CREATE_CREDENTIALS) {
        return {
          result: FAILED,
          message: FAILED_CREATE_CREDENTIALS,
        };
      } else {
        return {
          result: FAILED,
          message: TRANSACTION_FAILED,
        };
      }
    }
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

  // findOne(id: number) {
  //   return await this.prisma.person.find
  // }

  // update(id: number, updatePersonInput: UpdatePersonInput) {
  //   return await this.prisma.person.
  // }

  // remove(id: number) {
  //   return await this.prisma.person.
  // }
}
