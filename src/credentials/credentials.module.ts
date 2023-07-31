import { Module } from '@nestjs/common';
import { CredentialsService } from './credentials.service';
import { CredentialsResolver } from './credentials.resolver';

@Module({
  providers: [CredentialsResolver, CredentialsService],
  exports: [CredentialsService],
})
export class CredentialsModule {}
