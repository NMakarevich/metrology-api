import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [ContactController],
  providers: [ContactService, PrismaService],
  imports: [PrismaModule],
})
export class ContactModule {}
