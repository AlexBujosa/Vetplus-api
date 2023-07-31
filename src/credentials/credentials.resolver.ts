import { Resolver, Query } from '@nestjs/graphql';
import { CredentialsService } from './credentials.service';
import { Credentials } from './entities/credentials.entity';

@Resolver(() => Credentials)
export class CredentialsResolver {
  constructor(private readonly credentialservice: CredentialsService) {}

  @Query(() => Credentials)
  findCredentialsById(person_id: string) {
    return this.credentialservice.findById(person_id);
  }
}
