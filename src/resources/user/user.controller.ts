import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from '../../decorators/roles.decorator';
import { User } from './entities/user.entity';
import { Role } from '../../../generated/prisma/enums';
import { Public } from '../../decorators/public.decorator';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles(Role.ADMIN)
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(
    @Headers('Authorization') authorization: string,
    @Body() createUserDto: CreateUserDto,
  ) {
    return this.userService.create(createUserDto, authorization);
  }

  @Get('/profile')
  async profile(@Headers('Authorization') authorization: string): Promise<Omit<User, 'password'>> {
    return this.userService.getProfile(authorization);
  }

  @Roles(Role.ADMIN)
  @Get()
  async findAll(): Promise<Omit<User, 'password'>[]> {
    return this.userService.findAll();
  }

  @Public()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Get('/check')
  async checkLogin(@Query('login') login: string) {
    return this.userService.checkLogin(login);
  }

  @Roles(Role.ADMIN)
  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<Omit<User, 'password'>> {
    return this.userService.findOne(id);
  }

  @Roles(Role.ADMIN, Role.ENGINEER)
  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Headers('Authorization') authorization: string,
  ) {
    return this.userService.update(id, updateUserDto, authorization);
  }

  @Roles(Role.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.userService.remove(id);
  }
}
