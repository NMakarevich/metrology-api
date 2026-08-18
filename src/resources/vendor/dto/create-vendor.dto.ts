import { IsString, IsUUID } from 'class-validator';

export class CreateVendorDto {
  @IsString()
  name: string;

  @IsUUID()
  categoryId: string;
}
