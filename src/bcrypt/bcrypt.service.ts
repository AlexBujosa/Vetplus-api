import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

const SALT_ROUNDS = 12;

@Injectable()
export class BcryptService {
  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, SALT_ROUNDS);
  }

  async comparePassword(
    hashedPassword: string,
    password: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}
