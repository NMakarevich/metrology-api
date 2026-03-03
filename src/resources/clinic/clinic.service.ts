import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateClinicDto } from './dto/create-clinic.dto';
import { UpdateClinicDto } from './dto/update-clinic.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ClinicService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createClinicDto: CreateClinicDto) {
    const { addressId, address, contacts, ...data } = createClinicDto;
    if (!addressId && !address) {
      throw new BadRequestException('Select address or enter new address');
    }
    if (addressId) {
      return this.prismaService.clinic.create({
        data: {
          ...data,
          address: {
            connect: {
              id: addressId,
            },
          },
          contacts: {
            createMany: {
              data: contacts,
            },
          },
        },
      });
    } else if (address) {
      return this.prismaService.clinic.create({
        data: {
          ...data,
          address: {
            create: {
              address,
            },
          },
          contacts: {
            createMany: {
              data: contacts,
            },
          },
        },
      });
    }
  }

  findAll() {
    return this.prismaService.clinic.findMany({
      include: {
        contacts: {
          omit: {
            clinicId: true,
          },
        },
        address: true,
      },
      omit: {
        addressId: true,
      },
    });
  }

  async findOne(id: string) {
    const clinic = await this.prismaService.clinic.findUnique({
      where: { id },
      include: {
        contacts: {
          omit: {
            clinicId: true,
          },
        },
        address: true,
      },
      omit: {
        addressId: true,
      },
    });
    if (!clinic) {
      throw new NotFoundException('Clinic not found');
    }
    return clinic;
  }

  async update(clinicId: string, updateClinicDto: UpdateClinicDto) {
    await this.checkForExist(clinicId);
    const { addressId, address, ...data } = updateClinicDto;
    if (addressId) {
      return this.prismaService.clinic.update({
        where: { id: clinicId },
        data: {
          ...data,
          address: {
            connectOrCreate: {
              where: {
                id: addressId,
              },
              create: {
                address,
              },
            },
          },
        },
      });
    }
  }

  async remove(id: string) {
    await this.checkForExist(id);
    return this.prismaService.clinic.delete({
      where: {
        id,
      },
    });
  }

  private async checkForExist(id: string) {
    const clinic = await this.findOne(id);
    if (!clinic) {
      throw new NotFoundException('Clinic not found');
    }
  }
}
