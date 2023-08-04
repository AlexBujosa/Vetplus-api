import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './graphql/resolver/user.resolver';
import { PrismaService } from '@/prisma/prisma.service';

@Module({
  providers: [UserResolver, UserService, PrismaService],
  exports: [UserService],
})
export class UserModule {}
