import { Module } from '@nestjs/common';
import { VendorService } from './vendor.service';
import { VendorController } from './vendor.controller';
import { Vendors } from '../../mock/vendors';

@Module({
  controllers: [VendorController],
  providers: [VendorService, Vendors],
  exports: [VendorService],
})
export class VendorModule {}
