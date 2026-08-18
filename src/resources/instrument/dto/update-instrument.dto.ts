import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';
import { Status } from '../../../../generated/prisma/enums';

export class UpdateInstrumentDto {
  @IsString()
  @IsOptional()
  serialNumber: string;

  @IsEnum(Status)
  @IsOptional()
  status: Status;

  @IsDateString()
  @IsOptional()
  verifiedAt: string;

  @IsDateString()
  @IsOptional()
  validUntil: string;

  @IsString()
  @IsOptional()
  comment: string;
}
