import { Module } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { ClinicService } from './clinic.service';
import { ClinicResolver } from './graphql/resolver/clinic.resolver';
import { AwsS3Module } from '@/aws_s3/aws_s3.module';

@Module({
  imports: [AwsS3Module],
  providers: [ClinicService, ClinicResolver, PrismaService],
  exports: [ClinicService],
})
export class ClinicModule {}
