import { Module } from '@nestjs/common';
import { AwsS3Service } from './aws_s3.service';
import { AwsS3Resolver } from './aws_s3.resolver';

@Module({
  providers: [AwsS3Resolver, AwsS3Service]
})
export class AwsS3Module {}
