import { Module } from '@nestjs/common';
import { VerificationService } from './verification.service';
import { VerificationController } from './verification.controller';
import { Verifications } from '../../mock/verifications';

@Module({
  controllers: [VerificationController],
  providers: [VerificationService, Verifications],
})
export class VerificationModule {}
