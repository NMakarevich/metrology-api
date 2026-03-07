import { Module } from '@nestjs/common';
import { VerificationService } from './verification.service';
import { VerificationController } from './verification.controller';
import { Verifications } from '../../mock/verifications';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  controllers: [VerificationController],
  providers: [VerificationService, Verifications],
  imports: [PrismaModule],
})
export class VerificationModule {}
