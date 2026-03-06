import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class NoteService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createNoteDto: CreateNoteDto, engineerId: string) {
    return this.prismaService.note.create({
      data: { ...createNoteDto, engineer: { connect: { id: engineerId } } },
      include: {
        engineer: true,
      },
    });
  }

  findAll(engineerId: string) {
    return this.prismaService.note.findMany({
      where: { engineerId },
      include: {
        engineer: true,
      },
    });
  }

  findOne(id: string) {
    return this.prismaService.note.findUnique({ where: { id } });
  }

  async update(id: string, updateNoteDto: UpdateNoteDto, engineerId: string) {
    const note = await this.findOne(id);
    if (note.engineerId !== engineerId) {
      throw new UnauthorizedException();
    }
    return this.prismaService.note.update({ where: { id }, data: updateNoteDto });
  }

  remove(id: string) {
    return this.prismaService.note.delete({ where: { id } });
  }
}
