import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AddressService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createAddressDto: CreateAddressDto) {
    return this.prismaService.address.create({ data: createAddressDto });
  }

  findAll() {
    return this.prismaService.address.findMany();
  }

  async findOne(id: string) {
    const address = await this.prismaService.address.findUnique({ where: { id } });
    if (!address) {
      throw new NotFoundException('Address not found');
    }
    return address;
  }

  async update(id: string, updateAddressDto: UpdateAddressDto) {
    await this.checkForExist(id);
    const { address } = updateAddressDto;
    return this.prismaService.address.update({ where: { id }, data: address });
  }

  async remove(id: string) {
    await this.checkForExist(id);
    return this.prismaService.address.delete({ where: { id } });
  }

  private async checkForExist(id: string) {
    const address = await this.findOne(id);
    if (!address) {
      throw new NotFoundException('Address not found');
    }
  }
}
