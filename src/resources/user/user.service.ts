import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import 'dotenv/config';
import * as process from 'node:process';
import { DEFAULT_SALT_OR_ROUNDS } from './constants';
import { PrismaService } from '../../prisma/prisma.service';
import { Role } from '../../../generated/prisma/enums';

const BCRYPT_SALT = Number(process.env.SALT_OR_ROUNDS ?? DEFAULT_SALT_OR_ROUNDS);

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const hash = await bcrypt.hash(createUserDto.password, BCRYPT_SALT);
    const users = await this.findAll();

    const newUser = new User(
      Object.assign({}, createUserDto, {
        password: hash,
        updatedBy: '',
        role: users.length === 0 ? Role.ADMIN : Role.ENGINEER,
      }),
    );
    return this.prismaService.user.create({
      data: newUser,
      omit: {
        password: true,
      },
    });
  }

  findAll() {
    return this.prismaService.user.findMany({
      omit: {
        password: true,
      },
    });
  }

  async findOne(id: string) {
    const user = await this.prismaService.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async findByLogin(user: string) {
    return this.prismaService.user.findUnique({
      where: { login: user },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto, authorization: string) {
    if (updateUserDto.login) {
      const user = await this.findByLogin(updateUserDto.login);
      if (user) {
        throw new HttpException('User with entered login is exist', HttpStatus.CONFLICT);
      }
    }
    const user = await this.findOne(id);
    if (updateUserDto.oldPassword) {
      const isMatch = await bcrypt.compare(updateUserDto.oldPassword, user.password);
      if (!isMatch) {
        throw new HttpException('Incorrect password', HttpStatus.UNAUTHORIZED);
      }
    }
    const hash = await bcrypt.hash(updateUserDto.newPassword, BCRYPT_SALT);
    const updatedUser = Object.assign(user, updateUserDto, {
      updatedBy: authorization,
      password: hash,
    });
    return this.prismaService.user.update({
      where: { id },
      data: { ...updatedUser, version: { increment: 1 } },
      omit: {
        password: true,
      },
    });
  }

  remove(id: string) {
    return this.prismaService.user.delete({ where: { id } });
  }
}
