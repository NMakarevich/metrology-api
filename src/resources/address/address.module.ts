import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { Addresses } from '../../mock/addresses';

@Module({
  controllers: [AddressController],
  providers: [AddressService, Addresses],
  exports: [AddressService],
})
export class AddressModule {}
