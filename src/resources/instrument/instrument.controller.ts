import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { InstrumentService } from './instrument.service';
import { CreateInstrumentDto } from './dto/create-instrument.dto';
import { UpdateInstrumentDto } from './dto/update-instrument.dto';
import { Roles } from '../../decorators/roles.decorator';
import { ENGINEER_ROLE } from '../engineer/entities/engineer.entity';

@Controller('clinic/:clinicId/category/:categoryId/instrument')
export class InstrumentController {
  constructor(private readonly instrumentService: InstrumentService) {}

  @Post()
  create(
    @Param('clinicId', new ParseUUIDPipe()) clinicId: string,
    @Param('categoryId', new ParseUUIDPipe()) categoryId: string,
    @Body() createInstrumentDto: CreateInstrumentDto,
  ) {
    return this.instrumentService.create(clinicId, categoryId, createInstrumentDto);
  }

  @Get()
  findAll(
    @Param('clinicId', new ParseUUIDPipe()) clinicId: string,
    @Param('categoryId', new ParseUUIDPipe()) categoryId: string,
  ) {
    return this.instrumentService.findAll(clinicId, categoryId);
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.instrumentService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateInstrumentDto: UpdateInstrumentDto,
  ) {
    return this.instrumentService.update(id, updateInstrumentDto);
  }

  @Roles(ENGINEER_ROLE.ADMIN)
  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.instrumentService.remove(id);
  }
}
