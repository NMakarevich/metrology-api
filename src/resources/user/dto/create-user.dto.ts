import { IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { Role } from '../../../../generated/prisma/enums';

export class CreateUserDto {
  @IsString()
  @MinLength(2, { message: 'First name must be at least 2 characters' })
  firstName: string;

  @IsString()
  @MinLength(2, { message: 'Last name must be at least 2 characters' })
  lastName: string;

  @IsString()
  @MinLength(6, { message: 'Login must be at least 6 characters' })
  login: string;

  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters' })
  password: string;

  @IsOptional()
  @IsEnum(Role)
  role: Role;
}
