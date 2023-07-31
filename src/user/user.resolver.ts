import { Resolver, Query } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userservice: UserService) {}

  @Query(() => User)
  findUserById(id: string) {
    return this.userservice.findById(id);
  }
}
