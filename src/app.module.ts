import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { join } from 'path';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { BcryptService } from './bcrypt/bcrypt.service';
import { BcryptModule } from './bcrypt/bcrypt.module';
import { AuthModule } from './auth/auth.module';
import { CredentialsModule } from './credentials/credentials.module';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { CredentialsService } from './credentials/credentials.service';
import { PetModule } from './pet/pet.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    PrismaModule,
    BcryptModule,
    AuthModule,
    UserModule,
    CredentialsModule,
    PetModule,
  ],
  providers: [PrismaService, BcryptService, UserService, CredentialsService],
})
export class AppModule {}
