import { IsArray, IsEmail, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateClinicDto {
  @IsString()
  name: string;

  @IsUUID()
  @IsOptional()
  addressId: string;

  @IsString()
  @IsOptional()
  address: string;

  @IsArray()
  contacts: Contact[];
}

export class Contact {
  @IsString()
  fullName: string;

  @IsString()
  @IsOptional()
  phone: string;

  @IsOptional()
  @IsEmail()
  email: string;
}
