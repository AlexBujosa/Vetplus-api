/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { Schema } from 'yup';

@Injectable()
export class YupValidationPipe implements PipeTransform {
  constructor(private schema: Schema<object>) {}

  async transform(value: unknown, metadata: ArgumentMetadata) {
    try {
      await this.schema.validate(value);
    } catch (error) {
      throw new BadRequestException('Validation failed');
    }
    return value;
  }
}
