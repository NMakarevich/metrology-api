import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [AddressController],
  providers: [AddressService, PrismaService],
  exports: [AddressService],
  imports: [PrismaModule],
})
export class AddressModule {}
