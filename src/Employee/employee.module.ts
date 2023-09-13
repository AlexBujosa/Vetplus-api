import { Module } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { EmployeeService } from './employee.service';
import { EmployeeResolver } from './graphql/resolver/employee.resolver';

@Module({
  imports: [],
  providers: [EmployeeService, EmployeeResolver, PrismaService],
  exports: [EmployeeService],
})
export class EmployeeModule {}
