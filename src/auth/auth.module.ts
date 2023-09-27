import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './graphql/resolvers/auth.resolver';
import { BcryptModule } from '@/bcrypt/bcrypt.module';
import { PrismaService } from '@/prisma/prisma.service';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '@/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '@/auth/strategies/jwt.strategy';
import { jwtConstant } from './constant/contants';
import { GoogleAuthService } from './google-auth/google-auth.service';
import { CredentialsModule } from '@/credentials/credentials.module';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthGateWay } from './auth.gateway';
import { CacheModule } from '@nestjs/cache-manager';
import { NotificationService } from '@/notification/notification.service';
//import * as redisStore from 'cache-manager-redis-store';
@Module({
  imports: [
    CacheModule.register({
      host: 'localhost',
      port: 6379,
    }),
    BcryptModule,
    PassportModule,
    UserModule,
    CredentialsModule,
    JwtModule.register({
      secret: jwtConstant.secret,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  providers: [
    AuthService,
    AuthResolver,
    PrismaService,
    LocalStrategy,
    JwtStrategy,
    GoogleAuthService,
    AuthGateWay,
    NotificationService,
  ],
  exports: [AuthService, JwtStrategy],
})
export class AuthModule {}
