import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-category.dto';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  @IsString()
  @IsOptional()
  name: string;

  @IsUUID('4', { each: true })
  @IsOptional()
  addClinics: string[];

  @IsUUID('4', { each: true })
  @IsOptional()
  removeClinics: string[];
}
