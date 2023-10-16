import { Module } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { AppointmentService } from './appointment.service';
import { AppointmentResolver } from './graphql/resolver/appointment.resolver';
@Module({
  imports: [],
  providers: [AppointmentResolver, AppointmentService, PrismaService],
  exports: [AppointmentService],
})
export class AppointmentModule {}
