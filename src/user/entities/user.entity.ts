import { ObjectType, Field } from '@nestjs/graphql';
import { AuthProvider } from '@prisma/client';

@ObjectType()
export class User {
  @Field()
  id: string;

  @Field()
  email: string;

  @Field()
  Provider: AuthProvider;

  @Field()
  Status: boolean;
}
