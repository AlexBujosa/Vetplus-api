import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class CommentOwnerByIdClinic {
  @Field(() => String)
  names: string;

  @Field(() => String)
  surnames: string;

  @Field(() => String)
  image: string;
}
