import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateUserInput } from './graphql/input/create-user.input';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import {
  customException,
  signUpCustomException,
} from '../global/constant/constants';
import { User } from './graphql/types/user.type';
import { UpdateUserInput } from './graphql/input/update-user.input';
import { UpdateUserRoleInput } from './graphql/input/update-user-role.input';
import { UserProfile } from './graphql/types/user-profile.type';
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
        throw signUpCustomException.EMAIL_ALREADY_EXIST(null);
      } else {
        throw signUpCustomException.TRANSACTION_FAILED(null);
      }
    }
  }
  async update(updateUserInput: UpdateUserInput, id: string): Promise<User> {
    try {
      return await this.prismaService.user.update({
        data: {
          ...updateUserInput,
        },
        where: {
          id,
        },
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code == 'P2002'
      ) {
        throw signUpCustomException.EMAIL_ALREADY_EXIST(null);
      } else {
        throw customException.UPDATE_USER_FAIL(null);
      }
    }
  }

  async updateRole(updateUserRoleInput: UpdateUserRoleInput): Promise<User> {
    const { id, role } = updateUserRoleInput;
    return await this.prismaService.user.update({
      data: {
        role,
      },
      where: {
        id,
      },
    });
  }

  async findByEmail(email: string): Promise<User> {
    const result = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (!result) throw customException.EMAIL_NOT_FOUND(null);

    return result;
  }

  async findById(id: string): Promise<UserProfile> {
    return await this.prismaService.user.findUnique({
      include: {
        User_Fmc: true,
      },
      where: {
        id,
      },
    });
  }

  async findAll() {
    return await this.prismaService.user.findMany();
  }

  async registerTokenFMC(id_user: string, token_fmc: string): Promise<boolean> {
    const tokenRegistered = await this.prismaService.user_Fmc.create({
      data: {
        id_user,
        token_fmc,
      },
    });
    return tokenRegistered ? true : false;
  }
}
