import { PartialType } from '@nestjs/mapped-types';
import { CreateEngineerDto } from './create-engineer.dto';
import { IsEnum, IsOptional, IsString, MinLength, ValidateIf } from 'class-validator';
import { Role } from '../../../../generated/prisma/enums';

export class UpdateEngineerDto extends PartialType(CreateEngineerDto) {
  @IsOptional()
  @IsString()
  @MinLength(2, { message: 'First name must be at least 2 characters' })
  firstName: string;

  @IsOptional()
  @IsString()
  @MinLength(2, { message: 'Last name must be at least 2 characters' })
  lastName: string;

  @IsString()
  @IsOptional()
  @ValidateIf((o) => o.newPassword)
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  oldPassword: string;

  @IsString()
  @IsOptional()
  @ValidateIf((o) => o.oldPassword)
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  newPassword: string;

  @IsOptional()
  @IsEnum(Role)
  role: Role;
}
