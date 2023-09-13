import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './graphql/resolver/user.resolver';
import { PrismaService } from '@/prisma/prisma.service';
import { AwsS3Service } from '@/aws_s3/aws_s3.service';

@Module({
  providers: [UserResolver, UserService, PrismaService, AwsS3Service],
  exports: [UserService],
})
export class UserModule {}
