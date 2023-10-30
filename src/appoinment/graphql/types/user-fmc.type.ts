import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class UserFmc {
  @Field(() => String)
  id_user: string;

  @Field(() => String)
  token_fmc: string;
}
