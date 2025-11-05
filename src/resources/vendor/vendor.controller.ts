import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { VendorService } from './vendor.service';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';
import { Roles } from '../../decorators/roles.decorator';
import { ENGINEER_ROLE } from '../engineer/entities/engineer.entity';

@Controller('category/:categoryId/vendor')
export class VendorController {
  constructor(private readonly vendorService: VendorService) {}

  @Post()
  create(
    @Param('categoryId', new ParseUUIDPipe()) categoryId: string,
    @Body() createVendorDto: CreateVendorDto,
  ) {
    return this.vendorService.create(createVendorDto);
  }

  @Get()
  findAll(@Param('categoryId', new ParseUUIDPipe()) categoryId: string) {
    return this.vendorService.findAll(categoryId);
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.vendorService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', new ParseUUIDPipe()) id: string, @Body() updateVendorDto: UpdateVendorDto) {
    return this.vendorService.update(id, updateVendorDto);
  }

  @Roles(ENGINEER_ROLE.ADMIN)
  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.vendorService.remove(id);
  }
}
