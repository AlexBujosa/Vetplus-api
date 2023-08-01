import { Injectable } from '@nestjs/common';
import { BcryptService } from '@/bcrypt/bcrypt.service';
import { SignInInput } from './graphql/inputs/sign-in.input';
import { UserService } from '@/user/user.service';
import { SignUpInput } from './graphql/inputs/sign-up.input';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private bcryptService: BcryptService,
  ) {}

  async register(signUpInput: SignUpInput) {
    const hash = await this.bcryptService.hashPassword(signUpInput.password);
    signUpInput.password = hash;
    return await this.userService.create(signUpInput);
  }

  async login(signInInput: SignInInput) {
    // TODO
    // return await this.person.findMany();
  }
}
