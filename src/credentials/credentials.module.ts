import { Module } from '@nestjs/common';
import { CredentialsService } from './credentials.service';
import { CredentialsResolver } from './graphql/resolver/credentials.resolver';
import { PrismaService } from '@/prisma/prisma.service';

@Module({
  providers: [CredentialsResolver, CredentialsService, PrismaService],
  exports: [CredentialsService],
})
export class CredentialsModule {}
