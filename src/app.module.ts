import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EngineerModule } from './resources/engineer/engineer.module';
import { RolesGuard } from './guards/roles.guard';
import { APP_GUARD } from '@nestjs/core';
import { EngineersDB } from './mock/engineers';

@Module({
  imports: [EngineerModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    EngineersDB,
  ],
})
export class AppModule {}
