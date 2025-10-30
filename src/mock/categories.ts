import { Injectable } from '@nestjs/common';
import { BaseDb } from './base-db';
import { Category } from '../resources/category/entities/category.entity';

@Injectable()
export class Categories extends BaseDb<Category> {}
