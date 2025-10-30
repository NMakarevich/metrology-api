import { IsNotEmpty, IsUUID } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-category.dto';

export class UpdateClinicIdsDto extends PartialType(CreateCategoryDto) {
  @IsUUID('4', { each: true })
  @IsNotEmpty()
  ids: string[];
}
