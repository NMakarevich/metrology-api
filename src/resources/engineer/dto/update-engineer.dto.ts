import { PartialType } from '@nestjs/mapped-types';
import { CreateEngineerDto } from './create-engineer.dto';
import { IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
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

  @IsOptional()
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  password: string;

  @IsOptional()
  @IsEnum(Role)
  role: Role;
}
