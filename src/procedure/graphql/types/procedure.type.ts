import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Procedure {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  created_at: Date;

  @Field()
  updated_at: Date;

  @Field()
  status: boolean;
}
