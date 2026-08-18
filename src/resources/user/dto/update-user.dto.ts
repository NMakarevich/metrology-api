import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEnum, IsOptional, IsString, Matches, MinLength, ValidateIf } from 'class-validator';
import { Role } from '../../../../generated/prisma/enums';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @IsOptional()
  @ValidateIf((o) => o.newPassword)
  oldPassword: string;

  @IsString()
  @IsOptional()
  @ValidateIf((o) => o.oldPassword)
  @MinLength(8, { message: 'Пароль должен состоять минимум из 8 символов' })
  @Matches(/[A-ZА-Я]/g, { message: 'Пароль должен содержать как минимум одну заглавную букву' })
  @Matches(/[a-zа-я]/g, { message: 'Пароль должен содержать как минимум одну строчную букву' })
  @Matches(/[0-9]/g, { message: 'Пароль должен содержать как минимум одну цифру' })
  @Matches(/[!@#$%^&*()_+=;:,.?`"'\\/|~{}[\]]/gm, {
    message: 'Пароль должен содержать как минимум один специальный символ',
  })
  newPassword: string;

  @IsOptional()
  @IsEnum(Role)
  role: Role;
}
