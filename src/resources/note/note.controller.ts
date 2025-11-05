import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
  ParseUUIDPipe,
} from '@nestjs/common';
import { NoteService } from './note.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { JwtService } from '@nestjs/jwt';

@Controller('note')
export class NoteController {
  constructor(
    private readonly noteService: NoteService,
    private readonly jwt: JwtService,
  ) {}

  @Post()
  create(@Body() createNoteDto: CreateNoteDto, @Headers('Authorization') authorization: string) {
    const engineerId = this.extractEngineerIdFromToken(authorization);
    return this.noteService.create(createNoteDto, engineerId);
  }

  @Get()
  findAll() {
    return this.noteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.noteService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateNoteDto: UpdateNoteDto,
    @Headers('Authorization') authorization: string,
  ) {
    const engineerId = this.extractEngineerIdFromToken(authorization);
    return this.noteService.update(id, updateNoteDto, engineerId);
  }

  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.noteService.remove(id);
  }

  private extractEngineerIdFromToken(authorization: string) {
    const token = authorization.split('Bearer ')[1];
    const { sub } = this.jwt.verify(token);
    return sub;
  }
}
