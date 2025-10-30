import { Module } from '@nestjs/common';
import { ClinicService } from './clinic.service';
import { ClinicController } from './clinic.controller';
import { Clinics } from '../../mock/clinics';
import { AddressModule } from '../address/address.module';

@Module({
  controllers: [ClinicController],
  providers: [ClinicService, Clinics],
  imports: [AddressModule],
  exports: [ClinicService],
})
export class ClinicModule {}
