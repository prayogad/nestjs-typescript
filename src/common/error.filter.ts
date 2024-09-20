import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { ZodError } from 'zod';

@Catch(ZodError, HttpException)
export class ErrorFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const resposne = host.switchToHttp().getResponse();

    if (exception instanceof HttpException) {
      resposne.status(exception.getStatus()).json({
        errors: exception.getResponse(),
      });
    } else if (exception instanceof ZodError) {
      resposne.status(400).json({
        errors: 'Validation Error',
      });
    } else {
      resposne.status(500).json({
        errors: exception.message,
      });
    }
  }
}
