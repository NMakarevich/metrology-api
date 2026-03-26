import { Logger } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export function LoggerMiddleware(req: Request, res: Response, next: NextFunction) {
  const logger = new Logger('HTTP');
  const { url, method } = req;

  res.on('finish', () => {
    const { statusCode, statusMessage } = res;
    if (statusCode >= 200 && statusCode < 500) {
      logger.log(`${method} ${url} - ${statusCode}: ${statusMessage}`);
    }
    if (statusCode >= 500) {
      logger.error(`${method} ${url} - ${statusCode}: ${statusMessage}`);
    }
  });

  next();
}
