import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { ModelService } from './model.service';
import { CreateModelDto } from './dto/create-model.dto';
import { UpdateModelDto } from './dto/update-model.dto';
import { Roles } from '../../decorators/roles.decorator';
import { Role } from '../../../generated/prisma/enums';

@Controller('category/:categoryId/vendor/:vendorId/model')
export class ModelController {
  constructor(private readonly modelService: ModelService) {}

  @Post()
  create(
    @Param('categoryId', new ParseUUIDPipe()) categoryId: string,
    @Param('vendorId', new ParseUUIDPipe()) vendorId: string,
    @Body() createModelDto: CreateModelDto,
  ) {
    return this.modelService.create(createModelDto);
  }

  @Get()
  findAll(
    @Param('categoryId', new ParseUUIDPipe()) categoryId: string,
    @Param('vendorId', new ParseUUIDPipe()) vendorId: string,
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
  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.modelService.remove(id);
  }
}
