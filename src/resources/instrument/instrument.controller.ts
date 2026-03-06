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
  Query,
} from '@nestjs/common';
import { InstrumentService } from './instrument.service';
import { CreateInstrumentDto } from './dto/create-instrument.dto';
import { UpdateInstrumentDto } from './dto/update-instrument.dto';
import { Roles } from '../../decorators/roles.decorator';
import { Role } from '../../../generated/prisma/enums';
import { JwtService } from '@nestjs/jwt';

@Controller('instrument')
export class InstrumentController {
  constructor(
    private readonly instrumentService: InstrumentService,
    private readonly jwt: JwtService,
  ) {}

  @Post()
  create(@Body() createInstrumentDto: CreateInstrumentDto) {
    return this.instrumentService.create(createInstrumentDto);
  }

  @Get()
  findAll(
    @Query('clinic', new ParseUUIDPipe()) clinicId: string,
    @Query('category', new ParseUUIDPipe()) categoryId: string,
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

  @Roles(Role.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.instrumentService.remove(id);
  }
}
