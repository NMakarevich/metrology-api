import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class VendorService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createVendorDto: CreateVendorDto) {
    const { categoryId, ...data } = createVendorDto;
    return this.prismaService.vendor.create({
      data: { ...data, category: { connect: { id: categoryId } } },
    });
  }

  findAll(categoryId: string) {
    return this.prismaService.vendor.findMany({
      where: { categoryId },
      include: { models: { omit: { vendorId: true, categoryId: true } } },
    });
  }

  async findOne(id: string) {
    await this.checkForExist(id);
    return this.prismaService.vendor.findUnique({
      where: { id },
      include: { models: { omit: { vendorId: true, categoryId: true } } },
    });
  }

  async update(vendorId: string, updateVendorDto: UpdateVendorDto) {
    await this.checkForExist(vendorId);
    const { categoryId, ...data } = updateVendorDto;
    const vendor = await this.findOne(vendorId);
    if (categoryId && categoryId !== vendor.categoryId) {
      await this.prismaService.vendor.update({
        where: { id: vendorId },
        data: { category: { connect: { id: categoryId }, disconnect: { id: vendor.categoryId } } },
      });
    }
    return this.prismaService.vendor.update({ where: { id: vendorId }, data });
  }

  async remove(id: string) {
    await this.checkForExist(id);
    return this.prismaService.vendor.delete({ where: { id } });
  }

  private async checkForExist(vendorId: string) {
    const vendor = await this.prismaService.vendor.findUnique({ where: { id: vendorId } });
    if (!vendor) throw new NotFoundException('Vendor not found');
  }
}
