import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { Status } from '../../../../generated/prisma/enums';

const TAX_VALUE = 0.2;

export class CreateInstrumentDto {
  @IsString()
  @IsNotEmpty()
  serialNumber: string;

  @IsDateString()
  verifiedAt: string;

  @IsDateString()
  validUntil: string;

  @IsEnum(Status)
  status: Status;

  @IsUUID()
  clinicId: string;

  @IsUUID()
  categoryId: string;

  @IsString()
  @IsOptional()
  comment: string;

  @IsUUID()
  @ValidateIf((createInstrumentDto) => !createInstrumentDto.modelId)
  vendorId: string;

  @IsString()
  @IsOptional()
  vendorName: string;

  @IsUUID()
  @IsOptional()
  modelId: string;

  @ValidateIf((createInstrumentDto) => !createInstrumentDto.modelId)
  @IsString()
  modelName: string;

  @ValidateIf((createInstrumentDto) => !createInstrumentDto.modelId)
  @IsNumber()
  registryNumber: string;

  @ValidateIf((createInstrumentDto) => !createInstrumentDto.modelId)
  @IsString()
  registryName: string;

  @ValidateIf((createInstrumentDto) => !createInstrumentDto.modelId)
  @IsNumber()
  @Transform(({ value }) => value + value * TAX_VALUE)
  validationPrice: number;
}
