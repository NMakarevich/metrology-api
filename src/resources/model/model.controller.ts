import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ModelService } from './model.service';
import { CreateModelDto } from './dto/create-model.dto';
import { UpdateModelDto } from './dto/update-model.dto';
import { Roles } from '../../decorators/roles.decorator';
import { Role } from '../../../generated/prisma/enums';

@Controller('model')
export class ModelController {
  constructor(private readonly modelService: ModelService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() createModelDto: CreateModelDto) {
    return this.modelService.create(createModelDto);
  }

  @Get()
  findAll(
    @Query('category', new ParseUUIDPipe()) categoryId: string,
    @Query('vendor', new ParseUUIDPipe()) vendorId: string,
  ) {
    return this.modelService.findAll(categoryId, vendorId);
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.modelService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', new ParseUUIDPipe()) id: string, @Body() updateModelDto: UpdateModelDto) {
    return this.modelService.update(id, updateModelDto);
  }

  @Roles(Role.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.modelService.remove(id);
  }
}
