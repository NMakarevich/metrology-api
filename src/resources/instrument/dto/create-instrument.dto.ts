import { Status } from '../entities/instrument.entity';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';
import { Transform } from 'class-transformer';

const TAX_VALUE = 0.2;

export class CreateInstrumentDto {
  @IsString()
  @IsNotEmpty()
  serialNumber: string;

  @IsNumber()
  @IsString()
  verifiedAt: number;

  @IsNumber()
  @IsNotEmpty()
  validUntil: number;

  @IsUUID()
  @IsNotEmpty()
  createdBy: string;

  @IsEnum(Status)
  status: Status;

  @IsString()
  @IsOptional()
  comment: string;

  @IsUUID()
  @IsOptional()
  modelId: string;

  @ValidateIf((createInstrumentDto) => !createInstrumentDto.vendorId)
  @IsString()
  vendorName: string;

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
