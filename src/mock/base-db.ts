import { v4 as uuidv4 } from 'uuid';

export class BaseDb<T extends { id: string }> {
  private entities = [] as T[];

  create(createEntityDto: Partial<T>): T {
    const newEntity = Object.assign({}, createEntityDto, { id: uuidv4() }) as T;
    this.entities.push(newEntity);
    return newEntity;
  }

  findAll() {
    return this.entities;
  }

  findOne(entityId: string) {
    return this.entities.find(({ id }) => id === entityId);
  }

  update(id: string, updateData: Partial<T>) {
    const entity = this.findOne(id);
    return Object.assign(entity, updateData);
  }

  delete(entityId: string) {
    this.entities = this.entities.filter(({ id }) => id !== entityId);
  }
}
