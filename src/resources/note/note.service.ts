import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class NoteService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createNoteDto: CreateNoteDto, userId: string) {
    return this.prismaService.note.create({
      data: { ...createNoteDto, user: { connect: { id: userId } } },
      include: {
        user: true,
      },
    });
  }

  findAll(userId: string) {
    return this.prismaService.note.findMany({
      where: { userId },
      include: {
        user: true,
      },
    });
  }

  findOne(id: string) {
    return this.prismaService.note.findUnique({ where: { id } });
  }

  async update(id: string, updateNoteDto: UpdateNoteDto, userId: string) {
    const note = await this.findOne(id);
    if (note.userId !== userId) {
      throw new UnauthorizedException();
    }
    return this.prismaService.note.update({ where: { id }, data: updateNoteDto });
  }

  remove(id: string) {
    return this.prismaService.note.delete({ where: { id } });
  }
}
