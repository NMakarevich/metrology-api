import { Module } from '@nestjs/common';
import { ClinicService } from './clinic.service';
import { ClinicController } from './clinic.controller';
import { Clinics } from '../../mock/clinics';
import { PrismaModule } from '../../prisma/prisma.module';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [ClinicController],
  providers: [ClinicService, Clinics, PrismaService],
  imports: [PrismaModule],
  exports: [ClinicService],
})
export class ClinicModule {}
