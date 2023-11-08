import { Args, Context, Mutation, Resolver, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@/global/guard/jwt-auth.guard';
import { RolesGuard } from '@/global/guard/roles.guard';
import { Roles } from '@/global/decorator/roles.decorator';
import { Role } from '@prisma/client';

import { CommentService } from '@/comment/comments.service';
import { AddCommentInput } from '../input/add-comment.input';
import { CommentResponse } from '../types/comment-response.type';
import { Status } from '@/global/constant/constants';
import { DeleteCommentInput } from '../input/delete-comment.input';
import { GenericByIdInput } from '@/global/graphql/input/generic-by-id.input';
import { GetAllCommentByIdClinic } from '../types/get-all-comment-by-id-clinic';
import { GetMyComment } from '@/comment/constant';

@Resolver()
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}
  @Mutation(() => CommentResponse)
  @Roles(Role.ADMIN, Role.CLINIC_OWNER, Role.PET_OWNER, Role.VETERINARIAN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async registerComment(
    @Args('addCommentInput')
    addCommentInput: AddCommentInput,
    @Context() context,
  ): Promise<CommentResponse> {
    const result = await this.commentService.addComment(
      addCommentInput,
      context.req.user.sub,
    );

    return !result ? { result: Status.FAILED } : { result: Status.COMPLETED };
  }

  @Mutation(() => CommentResponse)
  @Roles(Role.ADMIN, Role.CLINIC_OWNER, Role.PET_OWNER, Role.VETERINARIAN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async deleteComment(
    @Args('deleteCommentInput')
    deleteCommentInput: DeleteCommentInput,
    @Context() context,
  ): Promise<CommentResponse> {
    const result = await this.commentService.deleteComment(
      deleteCommentInput,
      context.req.user.sub,
    );

    return !result ? { result: Status.FAILED } : { result: Status.COMPLETED };
  }

  @Query(() => [GetAllCommentByIdClinic])
  async getAllCommentByIdClinic(
    @Args('genericByIdInput')
    genericByIdInput: GenericByIdInput,
  ): Promise<GetAllCommentByIdClinic[]> {
    const result = await this.commentService.getAllCommentByIdClinic(
      genericByIdInput,
    );

    return result;
  }

  @Query(() => [GetAllCommentByIdClinic])
  @Roles(Role.CLINIC_OWNER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getMyComments(@Context() context): Promise<GetMyComment[]> {
    const result = await this.commentService.getMyComments(
      context.req.user.sub,
    );

    return result;
  }
}
