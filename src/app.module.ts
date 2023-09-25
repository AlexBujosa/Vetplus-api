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
import { SpecieModule } from './specie/specie.module';
import { BreedModule } from './breed/breed.module';
import { AwsS3Module } from './aws_s3/aws_s3.module';
import { ClinicModule } from './clinic/clinic.module';
import { ProcedureModule } from './procedure/procedure.module';
import { EmployeeModule } from './Employee/employee.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    CommentModule,
    PrismaModule,
    BcryptModule,
    AuthModule,
    UserModule,
    CredentialsModule,
    PetModule,
    SpecieModule,
    BreedModule,
    AwsS3Module,
    ClinicModule,
    ProcedureModule,
    EmployeeModule,
  ],
  providers: [PrismaService, BcryptService, UserService, CredentialsService],
})
export class AppModule {}
