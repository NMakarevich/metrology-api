import { Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { Prisma } from '../../generated/prisma/client';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter extends BaseExceptionFilter {
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
        super.catch(exception, host);
        break;
      }
    }
  }
}
