import { IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { ENGINEER_ROLE } from '../entities/engineer.entity';

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
  @IsEnum(ENGINEER_ROLE)
  role: ENGINEER_ROLE;
}
