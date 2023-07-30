import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { PersonModule } from '@/person/person.module';
import { BcryptModule } from '@/bcrypt/bcrypt.module';

@Module({
  imports: [PersonModule, BcryptModule],
  providers: [AuthService, AuthResolver],
})
export class AuthModule {}
