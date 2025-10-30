import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryNameDto } from './dto/update-category-name.dto';
import { Categories } from '../../mock/categories';
import { UpdateClinicIdsDto } from './dto/update-clinic-ids.dto';
import { ClinicService } from '../clinic/clinic.service';

@Injectable()
export class CategoryService {
  constructor(
    private readonly categoryDb: Categories,
    private readonly clinicService: ClinicService,
  ) {}

  create(createCategoryDto: CreateCategoryDto) {
    const newCategory = this.categoryDb.create(createCategoryDto);
    const { clinicId } = createCategoryDto;
    if (clinicId) {
      const clinic = this.clinicService.findOne(clinicId);
      this.clinicService.update(clinicId, { categoryIds: [...clinic.categoryIds, newCategory.id] });
    }
    return newCategory;
  }

  findAll() {
    return this.categoryDb.findAll();
  }

  findOne(id: string) {
    return this.categoryDb.findOne(id);
  }

  updateName(categoryId: string, updateCategoryNameDto: UpdateCategoryNameDto & { id?: string }) {
    this.checkForExist(categoryId);
    const { name, id } = updateCategoryNameDto;
    return this.categoryDb.update(categoryId, { name });
  }

  addClinicIds(categoryId: string, updateClinicIds: UpdateClinicIdsDto) {
    this.checkForExist(categoryId);
    const category = this.categoryDb.findOne(categoryId);
    const set = new Set([...category.clinicIds, ...updateClinicIds.ids]);
    return this.categoryDb.update(categoryId, { clinicIds: Array.from(set.values()) });
  }

  removeClinicIds(categoryId: string, updateClinicIds: UpdateClinicIdsDto) {
    this.checkForExist(categoryId);
    const category = this.categoryDb.findOne(categoryId);
    const set = new Set([...category.clinicIds]);
    for (const id of updateClinicIds.ids) {
      set.delete(id);
    }
    return this.categoryDb.update(categoryId, { clinicIds: Array.from(set.values()) });
  }

  remove(id: string) {
    this.checkForExist(id);
    return this.categoryDb.delete(id);
  }

  checkForExist(id: string) {
    const category = this.categoryDb.findOne(id);
    if (!category) {
      throw new NotFoundException(`Category not found`);
    }
  }
}
