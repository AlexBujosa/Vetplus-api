import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class RecoveryAccount {
  @Field()
  access_token: string;
}
