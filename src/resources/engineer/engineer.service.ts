import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEngineerDto } from './dto/create-engineer.dto';
import { UpdateEngineerDto } from './dto/update-engineer.dto';
import { Engineer } from './entities/engineer.entity';
import * as bcrypt from 'bcrypt';
import 'dotenv/config';
import * as process from 'node:process';
import { DEFAULT_SALT_OR_ROUNDS } from './constants';
import { PrismaService } from '../../prisma/prisma.service';
import { Role } from '../../../generated/prisma/enums';

const BCRYPT_SALT = Number(process.env.SALT_OR_ROUNDS ?? DEFAULT_SALT_OR_ROUNDS);

@Injectable()
export class EngineerService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createEngineerDto: CreateEngineerDto) {
    const hash = await bcrypt.hash(createEngineerDto.password, BCRYPT_SALT);
    const engineers = await this.findAll();

    const newEngineer = new Engineer(
      Object.assign({}, createEngineerDto, {
        password: hash,
        updatedBy: '',
        role: engineers.length === 0 ? Role.ADMIN : Role.ENGINEER,
      }),
    );
    return this.prismaService.engineer.create({
      data: newEngineer,
      omit: {
        password: true,
      },
    });
  }

  findAll() {
    return this.prismaService.engineer.findMany({
      omit: {
        password: true,
      },
    });
  }

  async findOne(id: string) {
    const engineer = await this.prismaService.engineer.findUnique({
      where: { id },
    });
    if (!engineer) {
      throw new HttpException('Engineer not found', HttpStatus.NOT_FOUND);
    }
    return engineer;
  }

  async findByLogin(engineerLogin: string) {
    return this.prismaService.engineer.findUnique({
      where: { login: engineerLogin },
    });
  }

  async update(id: string, updateEngineerDto: UpdateEngineerDto, authorization: string) {
    if (updateEngineerDto.login) {
      const engineer = await this.findByLogin(updateEngineerDto.login);
      if (engineer)
        throw new HttpException('Engineer with entered login is exist', HttpStatus.CONFLICT);
    }
    const engineer = await this.findOne(id);
    if (updateEngineerDto.oldPassword) {
      const isMatch = await bcrypt.compare(updateEngineerDto.oldPassword, engineer.password);
      if (!isMatch) {
        throw new HttpException('Incorrect password', HttpStatus.UNAUTHORIZED);
      }
    }
    const hash = await bcrypt.hash(updateEngineerDto.newPassword, BCRYPT_SALT);
    const updatedEngineer = Object.assign(engineer, updateEngineerDto, {
      updatedBy: authorization,
      password: hash,
    });
    return this.prismaService.engineer.update({
      where: { id },
      data: { ...updatedEngineer, version: { increment: 1 } },
      omit: {
        password: true,
      },
    });
  }

  remove(id: string) {
    return this.prismaService.engineer.delete({ where: { id } });
  }
}
