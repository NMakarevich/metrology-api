import { IsNumber, IsOptional, IsUUID, Max, Min, ValidateNested } from 'class-validator';

export class UpdatePlanningDto {
  @IsOptional()
  @IsNumber()
  year: number;

  @IsOptional()
  @ValidateNested()
  categories: UpdatePlanningCategoryDto[];
}

class UpdatePlanningCategoryDto {
  @IsUUID('4')
  id: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(11)
  month: number;

  @IsOptional()
  @IsUUID('4', { each: true })
  connectIds: string[];

  @IsOptional()
  @IsUUID('4', { each: true })
  disconnectIds: string[];
}
