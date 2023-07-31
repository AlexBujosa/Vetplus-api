import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { join } from 'path';
import { PersonModule } from './person/person.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { BcryptService } from './bcrypt/bcrypt.service';
import { BcryptModule } from './bcrypt/bcrypt.module';
import { AuthModule } from './auth/auth.module';
import { CredentialsModule } from './credentials/credentials.module';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { CredentialsService } from './credentials/credentials.service';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    PersonModule,
    PrismaModule,
    BcryptModule,
    AuthModule,
    UserModule,
    CredentialsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    BcryptService,
    UserService,
    CredentialsService,
  ],
})
export class AppModule {}
