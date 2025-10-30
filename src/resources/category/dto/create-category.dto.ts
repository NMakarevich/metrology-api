import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUUID('4')
  @IsOptional()
  clinicId: string;

  @IsUUID('4', { each: true })
  @IsOptional()
  clinicIds: string[];
}
