import { Module } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { BreedService } from './breed.service';
import { BreedResolver } from './graphql/resolver/breed.resolver';

@Module({
  imports: [],
  providers: [BreedService, BreedResolver, PrismaService],
  exports: [BreedService],
})
export class BreedModule {}
