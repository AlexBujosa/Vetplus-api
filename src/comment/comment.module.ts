import { Module } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CommentService } from './comments.service';
import { CommentResolver } from './graphql/resolver/comment.resolver';
@Module({
  imports: [],
  providers: [CommentService, CommentResolver, PrismaService],
  exports: [CommentService],
})
export class CommentModule {}
