import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Comments {
  @Field(() => String)
  id: string;

  @Field(() => String)
  id_clinic: string;

  @Field(() => String)
  id_owner: string;

  @Field(() => String)
  comment: string;

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;

  @Field(() => Boolean)
  status: boolean;
}
