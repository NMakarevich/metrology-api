import { IsNumber, IsUUID, Max, Min, ValidateNested } from 'class-validator';

export class CreatePlanningDto {
  @IsNumber()
  @Min(new Date().getFullYear())
  year: number;

  @ValidateNested()
  categories: PlanningCategoryDto[];
}

export class PlanningCategoryDto {
  @IsUUID('4')
  categoryId: string;

  @IsNumber()
  @Min(0)
  @Max(11)
  month: number;

  @IsUUID('4', { each: true })
  instrumentsIds: string[];
}
