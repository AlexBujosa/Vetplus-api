import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UserService } from '../../user.service';
import { User } from '../types/user.type';
import { CreatedUserResponse } from '../types/created-user-response.type';
import { CreateUserInput } from '../input/create-user.input';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '@/global/guard/roles.guard';
import { Roles } from '@/global/decorator/roles.decorator';
import { Role } from '@prisma/client';
import { JwtAuthGuard } from '@/global/guard/jwt-auth.guard';
import { UpdateUserInput } from '../input/update-user.input';
import { UpdateUserResponse } from '../types/update-user-response.type';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => CreatedUserResponse)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  @Mutation(() => UpdateUserResponse)
  @Roles(Role.CLINIC_OWNER, Role.VETERINARIAN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
    @Context() context,
  ): Promise<UpdateUserResponse> {
    const result = await this.userService.update(
      updateUserInput,
      context.req.user.sub,
    );
    return result ? { result: 'COMPLETED' } : { result: 'FAILED' };
  }

  @Query(() => User)
  findUserById(id: string) {
    return this.userService.findById(id);
  }

  @Query(() => User)
  @UseGuards(JwtAuthGuard)
  getMyProfile(@Context() context) {
    return this.userService.findById(context.req.user.sub);
  }

  @Query(() => [User])
  @Roles(Role.CLINIC_OWNER, Role.VETERINARIAN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  findAll() {
    return this.userService.findAll();
  }
}
