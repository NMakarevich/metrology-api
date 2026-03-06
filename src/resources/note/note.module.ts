import { Module } from '@nestjs/common';
import { NoteService } from './note.service';
import { NoteController } from './note.controller';
import { Notes } from '../../mock/notes';
import { JwtService } from '@nestjs/jwt';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  controllers: [NoteController],
  providers: [NoteService, Notes, JwtService],
  imports: [PrismaModule],
})
export class NoteModule {}
