import { IsEnum, IsOptional, IsString } from 'class-validator';
import { VerificationStatus } from '../../../../generated/prisma/enums';

export class UpdateVerificationDto {
  @IsString()
  @IsOptional()
  account: number;

  @IsString()
  @IsOptional()
  accountId: string;

  @IsEnum(VerificationStatus)
  @IsOptional()
  status: VerificationStatus;
}
