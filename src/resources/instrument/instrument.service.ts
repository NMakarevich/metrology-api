import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInstrumentDto } from './dto/create-instrument.dto';
import { UpdateInstrumentDto } from './dto/update-instrument.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class InstrumentService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createInstrumentDto: CreateInstrumentDto) {
    const {
      categoryId,
      clinicId,
      modelId,
      validationPrice,
      registryNumber,
      registryName,
      modelName,
      vendorId,
      vendorName,
      ...data
    } = createInstrumentDto;

    if (!modelId && !vendorId) {
      return this.prismaService.instrument.create({
        data: {
          ...data,
          clinic: { connect: { id: clinicId } },
          category: { connect: { id: categoryId } },
          model: {
            create: {
              name: modelName,
              validationPrice,
              registryNumber,
              registryName,
              vendor: {
                create: {
                  name: vendorName,
                },
              },
            },
          },
        },
      });
    }

    if (!modelId) {
      return this.prismaService.instrument.create({
        data: {
          ...data,
          clinic: { connect: { id: clinicId } },
          category: { connect: { id: categoryId } },
          model: {
            create: {
              name: modelName,
              validationPrice,
              registryNumber,
              registryName,
              vendor: {
                connect: { id: vendorId },
              },
            },
          },
        },
      });
    }

    return this.prismaService.instrument.create({
      data: {
        ...data,
        clinic: { connect: { id: clinicId } },
        category: { connect: { id: categoryId } },
        model: { connect: { id: modelId } },
      },
    });
  }

  findAll(clinicId: string, categoryId: string) {
    return this.prismaService.instrument.findMany({
      where: { clinicId, categoryId },
      include: {
        model: {
          include: {
            vendor: {
              omit: { categoryId: true },
            },
          },
          omit: { vendorId: true, categoryId: true },
        },
      },
      omit: { clinicId: true, categoryId: true, modelId: true },
    });
  }

  findOne(id: string) {
    return this.prismaService.instrument.findUnique({
      where: { id },
      include: {
        model: {
          include: {
            vendor: {
              omit: { categoryId: true },
            },
          },
          omit: { vendorId: true, categoryId: true },
        },
      },
      omit: { clinicId: true, categoryId: true, modelId: true },
    });
  }

  async update(instrumentId: string, updateInstrumentDto: UpdateInstrumentDto) {
    await this.checkForExist(instrumentId);
    return this.prismaService.instrument.update({
      where: { id: instrumentId },
      data: updateInstrumentDto,
      include: {
        model: {
          include: {
            vendor: {
              omit: { categoryId: true },
            },
          },
          omit: { vendorId: true, categoryId: true },
        },
      },
      omit: { clinicId: true, categoryId: true, modelId: true },
    });
  }

  async remove(id: string) {
    await this.checkForExist(id);
    return this.prismaService.instrument.delete({ where: { id } });
  }

  private async checkForExist(id: string) {
    const instrument = await this.prismaService.instrument.findUnique({ where: { id } });
    if (!instrument) {
      throw new NotFoundException('Instrument not found');
    }
  }
}
