import { Module } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { AppointmentService } from './appointment.service';
import { AppointmentResolver } from './graphql/resolver/appointment.resolver';
import { ReminderModule } from '@/reminder/reminder.module';
import { ScheduleModule } from '@nestjs/schedule';
@Module({
  imports: [ScheduleModule.forRoot(), ReminderModule],
  providers: [AppointmentResolver, AppointmentService, PrismaService],
  exports: [AppointmentService],
})
export class AppointmentModule {}
