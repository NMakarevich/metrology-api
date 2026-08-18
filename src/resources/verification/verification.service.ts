import { Injectable } from '@nestjs/common';
import { CreateVerificationDto } from './dto/create-verification.dto';
import { UpdateVerificationDto } from './dto/update-verification.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { Status } from '../../../generated/prisma/enums';

@Injectable()
export class VerificationService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createVerificationDto: CreateVerificationDto) {
    const { categoryId, instrumentIds, ...data } = createVerificationDto;
    await this.prismaService.instrument.updateMany({
      where: {
        id: {
          in: instrumentIds,
        },
      },
      data: {
        status: Status.PREPARE_TO_VALIDATION,
      },
    });
    return this.prismaService.verification.create({
      data: {
        ...data,
        category: { connect: { id: categoryId } },
        instruments: {
          connect: instrumentIds.map((id) => ({ id })),
        },
      },
    });
  }

  findAll() {
    return this.prismaService.verification.findMany();
  }

  findOne(id: string) {
    return this.prismaService.verification.findUnique({
      where: { id },
      include: {
        instruments: true,
      },
    });
  }

  update(id: string, updateVerificationDto: UpdateVerificationDto) {
    return this.prismaService.verification.update({
      where: { id },
      data: updateVerificationDto,
      include: { instruments: true },
    });
  }

  remove(id: string) {
    return this.prismaService.verification.delete({ where: { id } });
  }
}
