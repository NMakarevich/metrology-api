import { Module } from '@nestjs/common';
import { EngineerService } from './engineer.service';
import { EngineerController } from './engineer.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [EngineerController],
  providers: [EngineerService, PrismaService],
  exports: [EngineerService],
  imports: [PrismaModule],
})
export class EngineerModule {}
