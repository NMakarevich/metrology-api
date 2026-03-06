import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createCategoryDto: CreateCategoryDto) {
    return this.prismaService.category.create({
      data: {
        name: createCategoryDto.name,
        clinics: {
          connect: createCategoryDto.clinicIds.map((id) => ({
            id: id,
          })),
        },
      },
      include: { clinics: true },
    });
  }

  findAll() {
    return this.prismaService.category.findMany({ include: { clinics: true } });
  }

  async findOne(id: string) {
    await this.checkForExist(id);
    return this.prismaService.category.findUnique({ where: { id }, include: { clinics: true } });
  }

  async update(categoryId: string, updateCategoryDto: UpdateCategoryDto) {
    const { name, addClinics, removeClinics } = updateCategoryDto;
    await this.checkForExist(categoryId);
    return this.prismaService.category.update({
      where: { id: categoryId },
      data: {
        name,
        clinics: {
          connect: addClinics ? addClinics.map((id) => ({ id })) : [],
          disconnect: removeClinics ? removeClinics.map((id) => ({ id })) : [],
        },
      },
      include: { clinics: true },
    });
  }

  async remove(id: string) {
    await this.checkForExist(id);
    return this.prismaService.category.delete({ where: { id } });
  }

  async checkForExist(id: string) {
    const category = await this.prismaService.category.findUnique({ where: { id } });
    if (!category) {
      throw new NotFoundException(`Category not found`);
    }
  }
}
