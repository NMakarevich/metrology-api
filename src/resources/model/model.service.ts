import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateModelDto } from './dto/create-model.dto';
import { UpdateModelDto } from './dto/update-model.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ModelService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createModelDto: CreateModelDto) {
    const { vendorId, categoryId, ...data } = createModelDto;
    return this.prismaService.model.create({
      data: {
        ...data,
        Category: { connect: { id: categoryId } },
        Vendor: { connect: { id: vendorId } },
      },
    });
  }

  findAll(categoryId: string, vendorId: string) {
    return this.prismaService.model.findMany({ where: { categoryId, vendorId } });
  }

  async findOne(id: string) {
    await this.checkForExist(id);
    return this.prismaService.model.findUnique({ where: { id } });
  }

  async update(id: string, updateModelDto: UpdateModelDto) {
    await this.checkForExist(id);
    const { categoryId, vendorId, ...data } = updateModelDto;
    const model = await this.findOne(id);
    if (categoryId && categoryId !== model.categoryId) {
      await this.prismaService.model.update({
        where: { id },
        data: { Category: { connect: { id: categoryId }, disconnect: { id: model.categoryId } } },
      });
    }
    if (vendorId && vendorId !== model.vendorId) {
      await this.prismaService.model.update({
        where: { id },
        data: { Vendor: { connect: { id: vendorId }, disconnect: { id: model.vendorId } } },
      });
    }
    return this.prismaService.model.update({ where: { id }, data });
  }

  async remove(id: string) {
    await this.checkForExist(id);
    return this.prismaService.model.delete({ where: { id } });
  }

  private async checkForExist(id: string) {
    const model = await this.prismaService.model.findUnique({ where: { id } });
    if (!model) {
      throw new NotFoundException('Model not found');
    }
  }
}
