import { Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ContactService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createContactDto: CreateContactDto) {
    return this.prismaService.contact.create({ data: createContactDto });
  }

  findAll() {
    return this.prismaService.contact.findMany();
  }

  findOne(id: string) {
    return this.prismaService.contact.findUnique({ where: { id } });
  }

  update(id: string, updateContactDto: UpdateContactDto) {
    return this.prismaService.contact.update({ where: { id }, data: updateContactDto });
  }

  remove(id: string) {
    return this.prismaService.contact.delete({ where: { id } });
  }
}
