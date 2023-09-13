import { Module } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { ProcedureService } from './procedure.service';
import { ProcedureResolver } from './graphql/resolver/procedure.resolver';
@Module({
  providers: [ProcedureResolver, ProcedureService, PrismaService],
  exports: [ProcedureService],
})
export class ProcedureModule {}
