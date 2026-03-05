import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { Categories } from '../../mock/categories';
import { ClinicModule } from '../clinic/clinic.module';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, Categories],
  imports: [ClinicModule, PrismaModule],
})
export class CategoryModule {}
