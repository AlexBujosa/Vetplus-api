import { Module } from '@nestjs/common';
import { GoogleAuthService } from './google-auth.service';
import { UserService } from '@/user/user.service';

@Module({
  imports: [UserService],
  providers: [GoogleAuthService],
  exports: [GoogleAuthService],
})
export class GoogleAuthModule {}
