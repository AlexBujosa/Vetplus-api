import { Module } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { ClinicService } from './clinic.service';
import { ClinicResolver } from './graphql/resolver/clinic.resolver';

@Module({
  imports: [],
  providers: [ClinicService, ClinicResolver, PrismaService],
  exports: [ClinicService],
})
export class ClinicModule {}
