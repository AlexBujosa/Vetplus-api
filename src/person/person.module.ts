import { Module } from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonResolver } from './person.resolver';
import { CredentialsService } from '@/credentials/credentials.service';
import { UserService } from '@/user/user.service';

@Module({
  providers: [PersonResolver, PersonService, CredentialsService, UserService],
  exports: [PersonService],
})
export class PersonModule {}
