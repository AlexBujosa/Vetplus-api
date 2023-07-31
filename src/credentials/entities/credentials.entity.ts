import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Credentials {
  @Field()
  id_user: string;

  @Field()
  password: string;

  @Field()
  Status: boolean;
}
