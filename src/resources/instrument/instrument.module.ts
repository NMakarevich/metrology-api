import { Module } from '@nestjs/common';
import { InstrumentService } from './instrument.service';
import { InstrumentController } from './instrument.controller';
import { VendorModule } from '../vendor/vendor.module';
import { ModelModule } from '../model/model.module';
import { Instruments } from '../../mock/instruments';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [InstrumentController],
  providers: [InstrumentService, Instruments, JwtService],
  imports: [VendorModule, ModelModule],
})
export class InstrumentModule {}
