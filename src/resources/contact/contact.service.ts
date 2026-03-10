import { Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ContactService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createContactDto: CreateContactDto) {
    const { clinicId, ...data } = createContactDto;
    return this.prismaService.contact.create({
      data: { ...data, clinic: { connect: { id: clinicId } } },
    });
  }

  findAll() {
    return this.prismaService.contact.findMany({
      include: {
        clinic: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  findOne(id: string) {
    return this.prismaService.contact.findUnique({
      where: { id },
      include: {
        clinic: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  update(id: string, updateContactDto: UpdateContactDto) {
    return this.prismaService.contact.update({ where: { id }, data: updateContactDto });
  }

  remove(id: string) {
    return this.prismaService.contact.delete({ where: { id } });
  }
}
