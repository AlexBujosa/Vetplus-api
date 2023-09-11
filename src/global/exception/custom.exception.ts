import {
  HttpException,
  HttpExceptionOptions,
  HttpStatus,
} from '@nestjs/common';

export class CustomException extends HttpException {
  constructor(
    message: string,
    statusCode: HttpStatus,
    options: HttpExceptionOptions,
  ) {
    super(message, statusCode, options);
    this.name = new.target.name;
    this.stack = options?.description;
  }
}
