import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Notes } from '../../mock/notes';

@Injectable()
export class NoteService {
  constructor(private readonly notesDb: Notes) {}

  create(createNoteDto: CreateNoteDto, engineerId: string) {
    const date = new Date().getTime();
    return this.notesDb.create(
      Object.assign(createNoteDto, {
        createdAt: date,
        updatedAt: date,
        createdBy: engineerId,
        updatedBy: engineerId,
      }),
    );
  }

  findAll() {
    return this.notesDb.findAll();
  }

  findOne(id: string) {
    return this.notesDb.findOne(id);
  }

  update(id: string, updateNoteDto: UpdateNoteDto, engineerId: string) {
    return this.notesDb.update(
      id,
      Object.assign(updateNoteDto, { updatedBy: engineerId, updatedAt: new Date().getTime() }),
    );
  }

  remove(id: string) {
    return this.notesDb.delete(id);
  }
}
