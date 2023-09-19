import { ObjectType, Field } from '@nestjs/graphql';
import { CommentOwner } from './comment-owner.type';
import { Comments } from './comment.type';

@ObjectType()
export class GetAllCommentByIdClinic extends Comments {
  @Field(() => CommentOwner)
  Owner: CommentOwner;
}
