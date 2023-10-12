import { Module, forwardRef } from '@nestjs/common';
import { CredentialsService } from './credentials.service';
import { CredentialsResolver } from './graphql/resolver/credentials.resolver';
import { PrismaService } from '@/prisma/prisma.service';
import { AuthGateWay } from '@/auth/auth.gateway';
import { AuthModule } from '@/auth/auth.module';
import { UserService } from '@/user/user.service';
import { CacheModule } from '@nestjs/cache-manager';
import { BcryptService } from '@/bcrypt/bcrypt.service';
import { NotificationModule } from '@/notification/notification.module';
@Module({
  imports: [
    CacheModule.register({
      host: 'localhost',
      port: 6379,
    }),
    forwardRef(() => AuthModule),
    NotificationModule,
  ],
  providers: [
    CredentialsResolver,
    CredentialsService,
    PrismaService,
    AuthGateWay,
    UserService,
    BcryptService,
  ],
  exports: [CredentialsService],
})
export class CredentialsModule {}
