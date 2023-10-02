import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class RecoveryAccount {
  @Field({ nullable: true })
  access_token: string;
}
