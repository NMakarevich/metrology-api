import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { EngineerService } from './engineer.service';
import { CreateEngineerDto } from './dto/create-engineer.dto';
import { UpdateEngineerDto } from './dto/update-engineer.dto';
import { Roles } from '../../decorators/roles.decorator';
import { Engineer } from './entities/engineer.entity';
import { Role } from '../../../generated/prisma/enums';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('engineer')
export class EngineerController {
  constructor(private readonly engineerService: EngineerService) {}

  @Roles(Role.ADMIN)
  @Post()
  async create(@Body() createEngineerDto: CreateEngineerDto) {
    return this.engineerService.create(createEngineerDto);
  }

  @Get()
  async findAll(): Promise<Engineer[]> {
    return this.engineerService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<Engineer> {
    return this.engineerService.findOne(id);
  }

  @Roles(Role.ADMIN, Role.ENGINEER)
  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateEngineerDto: UpdateEngineerDto,
    @Headers('Authorization') authorization: string,
  ) {
    return this.engineerService.update(id, updateEngineerDto, authorization);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.engineerService.remove(id);
  }
}
