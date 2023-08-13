import { Module } from '@nestjs/common';
import { SpecieService } from './specie.service';
import { SpecieResolver } from './graphql/resolver/specie.resolver';
import { PrismaService } from '@/prisma/prisma.service';

@Module({
  imports: [],
  providers: [SpecieService, SpecieResolver, PrismaService],
  exports: [SpecieService],
})
export class SpecieModule {}
