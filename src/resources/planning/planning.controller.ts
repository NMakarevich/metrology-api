import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { PlanningService } from './planning.service';
import { CreatePlanningDto } from './dto/create-planning.dto';
import { UpdatePlanningDto } from './dto/update-planning.dto';
import { Role } from '../../../generated/prisma/enums';
import { Roles } from '../../decorators/roles.decorator';

@Controller('planning')
export class PlanningController {
  constructor(private readonly planningService: PlanningService) {}

  @HttpCode(HttpStatus.OK)
  @Post()
  create(@Body() createPlanningDto: CreatePlanningDto) {
    return this.planningService.create(createPlanningDto);
  }

  @Get()
  findAll() {
    return this.planningService.findAll();
  }

  @Get(':year')
  findOne(@Param('year') year: string) {
    return this.planningService.findOne(Number(year));
  }

  @Patch(':year')
  update(@Param('year') year: string, @Body() updatePlanningDto: UpdatePlanningDto) {
    return this.planningService.update(year, updatePlanningDto);
  }

  @Roles(Role.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':year')
  remove(
    @Param('year') year: string,
    @Query('id', new ParseUUIDPipe({ optional: true })) id: string,
  ) {
    return this.planningService.remove(Number(year), id);
  }
}
