import { BcryptService } from '@/bcrypt/bcrypt.service';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { PersonService } from '@/person/person.service';

@Module({
  imports: [BcryptService, PersonService],
  providers: [AuthService, AuthResolver],
})
export class AuthModule {}
