import { IsEmail, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateContactDto {
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

  @IsString()
  @IsUUID('4')
  clinicId: string;
}
