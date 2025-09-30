import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Test1Module } from './test1/test1.module';

@Module({
  imports: [Test1Module],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
