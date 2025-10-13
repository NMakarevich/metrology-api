import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Headers,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { EngineerService } from './engineer.service';
import { CreateEngineerDto } from './dto/create-engineer.dto';
import { UpdateEngineerDto } from './dto/update-engineer.dto';
import { Roles } from '../../decorators/roles.decorator';
import { Engineer, ENGINEER_ROLE } from './entities/engineer.entity';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('engineer')
export class EngineerController {
  constructor(private readonly engineerService: EngineerService) {}

  @Roles(ENGINEER_ROLE.ADMIN)
  @Post()
  create(@Body() createEngineerDto: CreateEngineerDto) {
    const engineer = this.engineerService.findByLogin(createEngineerDto.login);
    if (engineer)
      throw new HttpException('Engineer with entered login is exist', HttpStatus.CONFLICT);
    return this.engineerService.create(createEngineerDto);
  }

  @Get()
  findAll(): Engineer[] {
    return this.engineerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Engineer {
    return this.engineerService.findOne(id);
  }

  @Roles(ENGINEER_ROLE.ADMIN, ENGINEER_ROLE.ENGINEER)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEngineerDto: UpdateEngineerDto,
    @Headers('Authorization') authorization: string,
  ) {
    return this.engineerService.update(id, updateEngineerDto, authorization);
  }

  @Roles(ENGINEER_ROLE.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.engineerService.remove(id);
  }
}
