export class BaseDb<T extends { id: string }> {
  private entities = [] as T[];

  create(entity: T) {
    this.entities.push(entity);
    return entity;
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
