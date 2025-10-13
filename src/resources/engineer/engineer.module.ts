import { Module } from '@nestjs/common';
import { EngineerService } from './engineer.service';
import { EngineerController } from './engineer.controller';
import { EngineersDB } from '../../mock/engineers';

@Module({
  controllers: [EngineerController],
  providers: [EngineerService, EngineersDB],
})
export class EngineerModule {}
