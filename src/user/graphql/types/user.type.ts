import { Role } from '@/global/constant/role';
import { ObjectType, Field } from '@nestjs/graphql';
import { AuthProvider } from '@prisma/client';

@ObjectType()
export class User {
  @Field()
  id: string;

  @Field()
  names: string;

  @Field()
  surnames: string;

  @Field()
  email: string;

  @Field()
  provider: AuthProvider;

  @Field({ nullable: true })
  document: string;

  @Field({ nullable: true })
  address: string;

  @Field({ nullable: true })
  telephone_number: string;

  @Field({ nullable: true })
  image: string;

  @Field()
  role: Role;

  @Field()
  created_at: Date;

  @Field()
  updated_at: Date;

  @Field()
  status: boolean;
}
