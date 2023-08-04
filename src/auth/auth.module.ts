import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './graphql/resolvers/auth.resolver';
import { BcryptModule } from '@/bcrypt/bcrypt.module';
import { CredentialsService } from '@/credentials/credentials.service';
import { PrismaService } from '@/prisma/prisma.service';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '@/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstant } from '@/jwt/constant/constant';
import { JwtStrategy } from '@/jwt/jwt.strategy';

@Module({
  imports: [
    BcryptModule,
    PassportModule,
    UserModule,
    JwtModule.register({
      secret: jwtConstant.secret,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  providers: [
    AuthService,
    AuthResolver,
    CredentialsService,
    PrismaService,
    LocalStrategy,
    JwtStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
