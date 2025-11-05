import { PartialType } from '@nestjs/mapped-types';
import { CreateVerificationDto } from './create-verification.dto';
import { IsString } from 'class-validator';

export class UpdateVerificationDto extends PartialType(CreateVerificationDto) {
  @IsString()
  account: string;
}
