import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import * as process from 'node:process';
import { ValidationPipe } from '@nestjs/common';
import { PrismaExceptionFilter } from './filters/prisma-exception.filter';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { LoggerMiddleware } from './middlewares/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.use(LoggerMiddleware);
  app.setGlobalPrefix('api');
  const port = Number(process.env.PORT ?? 4100);
  app.enableCors();

  app.useGlobalFilters(new PrismaExceptionFilter(), new HttpExceptionFilter());
  await app.listen(port);
}
bootstrap();
