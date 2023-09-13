import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { GqlArgumentsHost } from '@nestjs/graphql';
import { CustomException } from '../exception/custom.exception';
import { HttpAdapterHost } from '@nestjs/core';

@Catch(CustomException)
export class CustomExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}
  catch(exception: CustomException, host: ArgumentsHost) {
    switch (host.getType() as string) {
      case 'graphql':
        const { httpAdapter } = this.httpAdapterHost;
        const gqlArgumentHost = GqlArgumentsHost.create(host);
        const ctx = gqlArgumentHost.getContext();
        const request = ctx.req;
        const response = request.res;
        const status =
          exception.getStatus() || HttpStatus.INTERNAL_SERVER_ERROR;
        const responseBody = {
          data: null,
          errors: [
            {
              message: exception.message,
            },
          ],
          description: exception.stack,
          statusCode: status,
          timestamp: new Date().toISOString(),
          path: httpAdapter.getRequestUrl(request),
        };

        httpAdapter.reply(response, responseBody, status);

        break;
    }
  }
}
