import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateCredentialsInput } from './graphql/input/create-credentials.input';
import {
  customErrorMessage,
  signUpCustomError,
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
      throw signUpCustomError.FAILED_CREATE_CREDENTIALS();
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
      throw customErrorMessage.SOMETHING_WRONG_FIND_CREDENTIALS();
    }
  }

  async findAll() {
    return await this.prisma.user.findMany();
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
