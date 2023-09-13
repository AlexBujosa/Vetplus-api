import { Role } from '@/global/constant/role';
import { ObjectType, Field } from '@nestjs/graphql';
import { AuthProvider } from '@prisma/client';

@ObjectType()
export class User {
  @Field(() => String)
  id: string;

  @Field(() => String)
  names: string;

  @Field({ nullable: true })
  surnames: string;

  @Field(() => String)
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

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;

  @Field(() => Boolean)
  status: boolean;
}
