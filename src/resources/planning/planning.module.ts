import { Module } from '@nestjs/common';
import { PlanningService } from './planning.service';
import { PlanningController } from './planning.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  controllers: [PlanningController],
  providers: [PlanningService],
  imports: [PrismaModule],
})
export class PlanningModule {}
