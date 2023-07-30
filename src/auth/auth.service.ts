import { PersonService } from '@/person/person.service';
import { Injectable } from '@nestjs/common';
import { RegisterInput } from './dto/register.input';
import { BcryptService } from '@/bcrypt/bcrypt.service';
import { SignInInput } from './dto/sign-in.input';

@Injectable()
export class AuthService {
  constructor(private person: PersonService, private bcrypt: BcryptService) {}

  async register(dto: RegisterInput) {
    const hash = this.bcrypt.hashPassword(dto.password);

    // TODO: CREATE USER IN DB WITH USER SERVICE

    // return await this.person.create({
    //   data: { ...createPersonInput },
    // });
  }

  async login(dto: SignInInput) {
    // TODO
    // return await this.person.findMany();
  }
}
