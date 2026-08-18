import { IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateModelDto {
  @IsString()
  name: string;

  @IsString()
  registryNumber: string;

  @IsString()
  registryName: string;

  @IsNumber()
  validationPrice: number;

  @IsUUID('4')
  vendorId: string;

  @IsUUID('4')
  categoryId: string;
}
