import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import 'dotenv/config';
import * as process from 'node:process';
import { DEFAULT_SALT_OR_ROUNDS } from './constants';
import { PrismaService } from '../../prisma/prisma.service';
import { Role } from '../../../generated/prisma/enums';
import { DEFAULT_JWT_SECRET } from '../auth/constants';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { User } from './entities/user.entity';

const BCRYPT_SALT = Number(process.env.SALT_OR_ROUNDS ?? DEFAULT_SALT_OR_ROUNDS);

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto, authorization?: string) {
    const hash = await bcrypt.hash(createUserDto.password, BCRYPT_SALT);
    const users = await this.findAll();

    const newUser = new User(
      Object.assign({}, createUserDto, {
        password: hash,
        role: users.length === 0 ? Role.ADMIN : Role.ENGINEER,
        createdById: null,
        updatedById: null,
      }),
    );

    if (authorization) {
      const createdBy = await this.extractId(authorization);
      return this.prismaService.user.create({
        data: { ...newUser, createdBy: { connect: { id: createdBy } } },
        omit: {
          password: true,
        },
      });
    } else {
      const user = await this.prismaService.user.create({
        data: newUser,
        omit: { password: true },
      });
      return this.prismaService.user.update({
        where: { id: user.id },
        data: { createdBy: { connect: { id: user.id } } },
        omit: { password: true },
      });
    }
  }

  findAll() {
    return this.prismaService.user.findMany({
      include: {
        createdBy: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
        updatedBy: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
      omit: {
        password: true,
      },
    });
  }

  async findOne(id: string) {
    const user = await this.prismaService.user.findUnique({
      where: { id },
      include: {
        createdBy: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
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

  async getProfile(authorization: string) {
    const userId = await this.extractId(authorization);
    return this.prismaService.user.findUnique({
      where: { id: userId },
      include: {
        createdBy: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
      omit: { password: true },
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
    const hash = updateUserDto.oldPassword
      ? await bcrypt.hash(updateUserDto.newPassword, BCRYPT_SALT)
      : null;
    delete updateUserDto.oldPassword;
    delete updateUserDto.newPassword;
    const updatedBy = await this.extractId(authorization);
    const updatedUser = Object.assign({ ...updateUserDto, ...(hash && { password: hash }) });
    return this.prismaService.user.update({
      where: { id },
      data: {
        ...updatedUser,
        version: { increment: 1 },
        updatedBy: { connect: { id: updatedBy } },
      },
      include: {
        createdBy: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
      omit: {
        password: true,
      },
    });
  }

  remove(id: string) {
    return this.prismaService.user.delete({ where: { id } });
  }

  private async extractId(authorization: string) {
    const token = authorization.replace('Bearer ', '');
    try {
      const { sub } = await this.jwt.verify(token, {
        secret: process.env.JWT_SECRET ?? DEFAULT_JWT_SECRET,
      });
      return sub;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new UnauthorizedException();
      }
    }
  }
}
