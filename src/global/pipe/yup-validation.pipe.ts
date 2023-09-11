/* eslint-disable @typescript-eslint/no-unused-vars */
import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { Schema } from 'yup';
import { customException } from '../constant/constants';

@Injectable()
export class YupValidationPipe implements PipeTransform {
  constructor(private schema: Schema<object>) {}

  async transform(value: unknown, metadata: ArgumentMetadata) {
    try {
      await this.schema.validate(value);
    } catch (error) {
      throw customException.VALIDATION_FAILED({
        cause: new Error(),
        description: error.message,
      });
    }
    return value;
  }
}
