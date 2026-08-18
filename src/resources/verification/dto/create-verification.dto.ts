import { IsEnum, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { VerificationStatus } from '../../../../generated/prisma/enums';

export class CreateVerificationDto {
  @IsUUID('4', { each: true })
  instrumentIds: string[];

  @IsUUID('4')
  categoryId: string;

  @IsString()
  @IsOptional()
  accountId: string;

  @IsNumber()
  @IsOptional()
  account: number;

  @IsEnum(VerificationStatus)
  @IsOptional()
  status: VerificationStatus;
}
