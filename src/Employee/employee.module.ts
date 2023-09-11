import { Module } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { EmployeeService } from './employee.service';
import { EmployeeResolver } from './graphql/resolver/employee.resolver';
import { ClinicService } from '@/clinic/clinic.service';

@Module({
  imports: [],
  providers: [EmployeeService, EmployeeResolver, PrismaService, ClinicService],
  exports: [EmployeeService],
})
export class EmployeeModule {}
