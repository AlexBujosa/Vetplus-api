import { Resolver } from '@nestjs/graphql';
import { AwsS3Service } from './aws_s3.service';

@Resolver()
export class AwsS3Resolver {
  constructor(private readonly awsS3Service: AwsS3Service) {}
}
