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

  @IsUUID('4', { each: true })
  @IsOptional()
  categoryIds: string[];
}

export class Contact {
  @IsString()
  fullName: string;

  @IsString()
  role: string;

  @IsString()
  @IsOptional()
  phone: string;

  @IsOptional()
  @IsEmail()
  email: string;
}
