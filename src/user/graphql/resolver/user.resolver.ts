import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from '../../user.service';
import { User } from '../types/user.type';
import { CreatedUserResponse } from '../types/created-user-response.type';
import { CreateUserInput } from '../input/create-user.input';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '@/global/guard/roles.guard';
import { Roles } from '@/global/decorator/roles.decorator';
import { Role } from '@prisma/client';
import { JwtAuthGuard } from '@/global/guard/jwt-auth.guard';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}
  @Mutation(() => CreatedUserResponse)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }
  @Query(() => User)
  findUserById(id: string) {
    return this.userService.findById(id);
  }
  @Query(() => [User])
  @Roles(Role.CLINIC_OWNER, Role.VETERINARIAN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  findAll() {
    return this.userService.findAll();
  }
}
