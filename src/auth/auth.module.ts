import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './graphql/resolvers/auth.resolver';
import { BcryptModule } from '@/bcrypt/bcrypt.module';
import { UserService } from '@/user/user.service';
import { CredentialsService } from '@/credentials/credentials.service';

@Module({
  imports: [BcryptModule],
  providers: [AuthService, AuthResolver, UserService, CredentialsService],
})
export class AuthModule {}
