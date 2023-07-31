import { Field, ObjectType } from '@nestjs/graphql';
import { Person } from './person.entity';
import { User } from '@/user/entities/user.entity';
import { Credentials } from '@/credentials/entities/credentials.entity';

@ObjectType()
export class CreatePersonResponse {
  @Field(() => User)
  user: User;
  @Field(() => Credentials)
  credentials: Credentials;
  @Field(() => Person)
  person: Person;
}
