import { Module } from '@nestjs/common';
import { ModelService } from './model.service';
import { ModelController } from './model.controller';
import { Models } from '../../mock/models';

@Module({
  controllers: [ModelController],
  providers: [ModelService, Models],
  exports: [ModelService],
})
export class ModelModule {}
