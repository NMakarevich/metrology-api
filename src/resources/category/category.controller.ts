import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryNameDto } from './dto/update-category-name.dto';
import { Roles } from '../../decorators/roles.decorator';
import { Role } from '../../../generated/prisma/enums';
import { UpdateClinicIdsDto } from './dto/update-clinic-ids.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.categoryService.findOne(id);
  }

  @Patch(':id')
  updateName(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateCategoryNameDto: UpdateCategoryNameDto,
  ) {
    return this.categoryService.updateName(id, updateCategoryNameDto);
  }

  @Patch(':id/add-clinic')
  addClinic(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() addClinicDto: UpdateClinicIdsDto,
  ) {
    return this.categoryService.addClinicIds(id, addClinicDto);
  }

  @Patch(':id/remove-clinic')
  removeClinic(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() removeClinicDto: UpdateClinicIdsDto,
  ) {
    return this.categoryService.removeClinicIds(id, removeClinicDto);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }
}
