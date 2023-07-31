import { Injectable } from '@nestjs/common';
// import { UpdatePersonInput } from './dto/update-person.input';
import { PrismaService } from '@/prisma/prisma.service';
import { CreatePersonInput } from './dto/create-person.input';
import { CredentialsService } from '@/credentials/credentials.service';
import { UserService } from '@/user/user.service';

@Injectable()
export class PersonService {
  constructor(
    private prisma: PrismaService,
    private credentials: CredentialsService,
    private user: UserService,
  ) {}

  async create(createPersonInput: CreatePersonInput) {
    const { email, password, names, surnames } = createPersonInput;
    const createUser = { email };
    const userCreated = await this.user.create(createUser);
    const { id } = userCreated;
    const createCredentials = { id_user: id, password };
    const credentialsCreated = await this.credentials.create(createCredentials);

    const createPerson = { id_person: id, names, surnames };
    const personCreated = await this.prisma.person.create({
      data: { ...createPerson },
    });
    return {
      user: userCreated,
      credentials: credentialsCreated,
      person: personCreated,
    };
  }

  async findById(id_person: string) {
    return await this.prisma.person.findUnique({
      where: {
        id_person,
      },
    });
  }

  async findAll() {
    return await this.prisma.person.findMany();
  }

  // findOne(id: number) {
  //   return await this.prisma.person.find
  // }

  // update(id: number, updatePersonInput: UpdatePersonInput) {
  //   return await this.prisma.person.
  // }

  // remove(id: number) {
  //   return await this.prisma.person.
  // }
}
