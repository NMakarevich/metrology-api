import { IsString } from 'class-validator';

export class CreateNoteDto {
  @IsString()
  name: string;

  @IsString()
  description: string;
}
