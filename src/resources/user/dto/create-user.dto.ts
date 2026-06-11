import { IsEnum, IsOptional, IsString, Matches, MinLength } from 'class-validator';
import { Role } from '../../../../generated/prisma/enums';

export class CreateUserDto {
  @IsString()
  @MinLength(2, { message: 'Имя должно быть как минимум из двух букв' })
  @Matches(/^[А-Яа-я]+$/g, { message: 'Имя может содержать только кириллицу' })
  firstName: string;

  @IsString()
  @MinLength(2, { message: 'Фамилия должна быть как минимум из двух букв' })
  @Matches(/^[А-Яа-я]+$/g, { message: 'Фамилия может содержать только кириллицу' })
  lastName: string;

  @IsString()
  @MinLength(6, { message: 'Логин должен быть как минимум из 6 символов' })
  @Matches(/^[A-Za-z0-9]+$/g, { message: 'Логин может состоять только из английских букв и цифр' })
  login: string;

  @IsString()
  @MinLength(8, { message: 'Пароль должен состоять минимум из 8 символов' })
  @Matches(/[A-ZА-Я]/g, { message: 'Пароль должен содержать как минимум одну заглавную букву' })
  @Matches(/[a-zа-я]/g, { message: 'Пароль должен содержать как минимум одну строчную букву' })
  @Matches(/[0-9]/g, { message: 'Пароль должен содержать как минимум одну цифру' })
  @Matches(/[!@#$%^&*()_+=;:,.?`"'\\/|~{}[\]]/gm, {
    message: 'Пароль должен содержать как минимум один специальный символ',
  })
  password: string;

  @IsOptional()
  @IsEnum(Role)
  role: Role;
}
