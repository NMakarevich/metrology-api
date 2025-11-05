import { Module } from '@nestjs/common';
import { InstrumentService } from './instrument.service';
import { InstrumentController } from './instrument.controller';
import { VendorModule } from '../vendor/vendor.module';
import { ModelModule } from '../model/model.module';
import { Instruments } from '../../mock/instruments';

@Module({
  controllers: [InstrumentController],
  providers: [InstrumentService, Instruments],
  imports: [VendorModule, ModelModule],
})
export class InstrumentModule {}
