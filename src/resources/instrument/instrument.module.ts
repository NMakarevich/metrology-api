import { Module } from '@nestjs/common';
import { InstrumentService } from './instrument.service';
import { InstrumentController } from './instrument.controller';
import { Instruments } from '../../mock/instruments';
import { JwtService } from '@nestjs/jwt';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  controllers: [InstrumentController],
  providers: [InstrumentService, Instruments, JwtService],
  imports: [PrismaModule],
})
export class InstrumentModule {}
