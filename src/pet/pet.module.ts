import { Module } from '@nestjs/common';
import { PetResolver } from './graphql/resolvers/pet.resolver';
import { PetService } from './pet.service';
import { AwsS3Module } from '@/aws_s3/aws_s3.module';

@Module({
  imports: [AwsS3Module],
  providers: [PetResolver, PetService],
  exports: [PetService],
})
export class PetModule {}
