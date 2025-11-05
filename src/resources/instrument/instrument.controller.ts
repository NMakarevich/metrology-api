import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { InstrumentService } from './instrument.service';
import { CreateInstrumentDto } from './dto/create-instrument.dto';
import { UpdateInstrumentDto } from './dto/update-instrument.dto';
import { Roles } from '../../decorators/roles.decorator';
import { ENGINEER_ROLE } from '../engineer/entities/engineer.entity';
import { JwtService } from '@nestjs/jwt';

@Controller('clinic/:clinicId/category/:categoryId/instrument')
export class InstrumentController {
  constructor(
    private readonly instrumentService: InstrumentService,
    private readonly jwt: JwtService,
  ) {}

  @Post()
  create(
    @Param('clinicId', new ParseUUIDPipe()) clinicId: string,
    @Param('categoryId', new ParseUUIDPipe()) categoryId: string,
    @Headers('Authorization') authorization: string,
    @Body() createInstrumentDto: CreateInstrumentDto,
  ) {
    const engineerId = this.extractEngineerIdFromToken(authorization);
    return this.instrumentService.create(clinicId, categoryId, createInstrumentDto, engineerId);
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
    @Headers('Authorization') authorization: string,
    @Body() updateInstrumentDto: UpdateInstrumentDto,
  ) {
    const engineerId = this.extractEngineerIdFromToken(authorization);
    return this.instrumentService.update(id, updateInstrumentDto, engineerId);
  }

  @Roles(ENGINEER_ROLE.ADMIN)
  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.instrumentService.remove(id);
  }

  private extractEngineerIdFromToken(authorization: string) {
    const token = authorization.split('Bearer ')[1];
    const { sub } = this.jwt.verify(token);
    return sub;
  }
}
