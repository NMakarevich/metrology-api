import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { Categories } from '../../mock/categories';
import { ClinicModule } from '../clinic/clinic.module';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, Categories],
  imports: [ClinicModule],
})
export class CategoryModule {}
