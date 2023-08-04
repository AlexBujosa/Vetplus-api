import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { GqlArgumentsHost } from '@nestjs/graphql';
import { CustomException } from '../error/custom-exception';

@Catch(CustomException)
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: CustomException, host: ArgumentsHost) {
    switch (host.getType() as string) {
      case 'graphql':
        const gqlArgumentHost = GqlArgumentsHost.create(host);
        const ctx = gqlArgumentHost.getContext();
        const request = ctx.req;
        const response = request.res;
        const status =
          exception.getStatus() || HttpStatus.INTERNAL_SERVER_ERROR;
        response.status(status).json({
          data: null,
          errors: [
            {
              message: exception.message,
            },
          ],
        });
        break;
    }
  }
}
