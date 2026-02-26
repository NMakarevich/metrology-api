import { IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { Role } from '../../../../generated/prisma/enums';

export class CreateEngineerDto {
  @IsString()
  @MinLength(2, { message: 'First name must be at least 2 characters' })
  firstName: string;

  @IsString()
  @MinLength(2, { message: 'Last name must be at least 2 characters' })
  lastName: string;

  @IsString()
  @MinLength(5)
  login: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  password: string;

  @IsOptional()
  @IsEnum(Role)
  role: Role;
}
