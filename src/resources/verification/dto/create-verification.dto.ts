import { IsUUID } from 'class-validator';

export class CreateVerificationDto {
  @IsUUID('4', { each: true })
  instrumentIds: string[];

  @IsUUID('4')
  categoryId: string;
}
