import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from '../../user.service';
import { User } from '../types/user.type';
import { CreatedUserResponse } from '../types/created-user-response.type';
import { CreateUserInput } from '../input/create-user.input';

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
}
