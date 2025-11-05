import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { VerificationService } from './verification.service';
import { CreateVerificationDto } from './dto/create-verification.dto';
import { UpdateVerificationDto } from './dto/update-verification.dto';
import { Roles } from '../../decorators/roles.decorator';
import { ENGINEER_ROLE } from '../engineer/entities/engineer.entity';

@Controller('verification')
export class VerificationController {
  constructor(private readonly verificationService: VerificationService) {}

  @Post()
  create(@Body() createVerificationDto: CreateVerificationDto) {
    return this.verificationService.create(createVerificationDto);
  }

  @Get()
  findAll() {
    return this.verificationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.verificationService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateVerificationDto: UpdateVerificationDto,
  ) {
    return this.verificationService.update(id, updateVerificationDto);
  }

  @Roles(ENGINEER_ROLE.ADMIN)
  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.verificationService.remove(id);
  }
}
