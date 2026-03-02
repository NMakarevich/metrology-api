import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ClinicService } from './clinic.service';
import { CreateClinicDto } from './dto/create-clinic.dto';
import { UpdateClinicDto } from './dto/update-clinic.dto';
import { Roles } from '../../decorators/roles.decorator';
import { Role } from '../../../generated/prisma/enums';

@Controller('clinic')
export class ClinicController {
  constructor(private readonly clinicService: ClinicService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() createClinicDto: CreateClinicDto) {
    return this.clinicService.create(createClinicDto);
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  findAll() {
    return this.clinicService.findAll();
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.clinicService.findOne(id);
  }

  @HttpCode(HttpStatus.CREATED)
  @Patch(':id')
  update(@Param('id', new ParseUUIDPipe()) id: string, @Body() updateClinicDto: UpdateClinicDto) {
    return this.clinicService.update(id, updateClinicDto);
  }

  // @Roles(Role.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.clinicService.remove(id);
  }
}
