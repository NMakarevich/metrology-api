import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Prisma } from '../../generated/prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const code = exception.code;

    switch (code) {
      case 'P2002': {
        const statusCode = HttpStatus.CONFLICT;
        response.status(statusCode).json({
          message: 'Entity with passed data already exists',
          statusCode: statusCode,
        });
        break;
      }
      default: {
        const statusCode = 500;
        response.status(statusCode).json({
          message: 'Internal Server Error. Source: Prisma',
          statusCode: statusCode,
        });
        break;
      }
    }
  }
}
