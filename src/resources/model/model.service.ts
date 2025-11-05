import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateModelDto } from './dto/create-model.dto';
import { UpdateModelDto } from './dto/update-model.dto';
import { Models } from '../../mock/models';

@Injectable()
export class ModelService {
  constructor(private readonly modelsDb: Models) {}

  create(createModelDto: CreateModelDto) {
    return this.modelsDb.create(createModelDto);
  }

  findAll(categoryId: string, vendorId: string) {
    return this.modelsDb
      .findAll()
      .filter((model) => model.categoryId === categoryId && model.vendorId === vendorId);
  }

  findOne(id: string) {
    this.checkForExist(id);
    return this.modelsDb.findOne(id);
  }

  update(id: string, updateModelDto: UpdateModelDto) {
    this.checkForExist(id);
    return this.modelsDb.update(id, updateModelDto);
  }

  remove(id: string) {
    this.checkForExist(id);
    return this.modelsDb.delete(id);
  }

  private checkForExist(id: string) {
    const model = this.modelsDb.findOne(id);
    if (!model) {
      throw new NotFoundException('Model not found');
    }
  }
}
