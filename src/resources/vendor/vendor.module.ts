import { Module } from '@nestjs/common';
import { VendorService } from './vendor.service';
import { VendorController } from './vendor.controller';
import { Vendors } from '../../mock/vendors';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  controllers: [VendorController],
  providers: [VendorService, Vendors],
  exports: [VendorService],
  imports: [PrismaModule],
})
export class VendorModule {}
