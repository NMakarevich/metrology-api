import { IsArray, IsOptional, IsString, IsUUID, ValidateIf } from 'class-validator';
import { CreateContactDto } from '../../contact/dto/create-contact.dto';

export class CreateClinicDto {
  @IsString()
  name: string;

  @IsUUID()
  @ValidateIf((clinic) => !clinic.address)
  addressId: string;

  @IsString()
  @ValidateIf((clinic) => !clinic.addressId)
  address: string;

  @IsArray()
  @IsOptional()
  contacts: CreateContactDto[];

  @IsUUID('4', { each: true })
  @IsOptional()
  categoryIds: string[];
}
