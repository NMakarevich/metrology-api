import { Module } from '@nestjs/common';
import { ModelService } from './model.service';
import { ModelController } from './model.controller';
import { Models } from '../../mock/models';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  controllers: [ModelController],
  providers: [ModelService, Models],
  exports: [ModelService],
  imports: [PrismaModule],
})
export class ModelModule {}
