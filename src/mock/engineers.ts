import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Role } from '../../generated/prisma/enums';
import { User } from '../resources/user/entities/user.entity';

@Injectable()
export class EngineersDB {
  engineers: User[] = [
    new User({
      firstName: 'Nikolai',
      lastName: 'Makarevich',
      login: 'makarevichna',
      password: '$2b$10$JDzfWasSRPqCzsICKzExGeS/Tr.p5WAYPfoss/GHqs6lLSZMGrT5q',
      id: uuidv4(),
      createdAt: '1760372675265',
      updatedAt: '1760372675265',
      updatedBy: null,
      version: 1,
      role: Role.ADMIN,
    }),
    new User({
      firstName: 'Nikolai',
      lastName: 'Makarevich',
      login: 'makarevichna1',
      password: '$2b$10$JDzfWasSRPqCzsICKzExGeS/Tr.p5WAYPfoss/GHqs6lLSZMGrT5q',
      id: uuidv4(),
      createdAt: '1760372687871',
      updatedAt: '1760372687871',
      updatedBy: null,
      version: 1,
      role: Role.ENGINEER,
    }),
  ];

  create(engineer: User) {
    this.engineers.push(engineer);
    return engineer;
  }

  getAll() {
    return this.engineers;
  }

  get(engineerId: string) {
    return this.engineers.find(({ id }) => id === engineerId);
  }

  getByLogin(engineerLogin: string) {
    return this.engineers.find(({ login }) => login === engineerLogin);
  }

  update(engineerId: string, updatedEngineer: User) {
    const engineer = this.engineers.find(({ id }) => id === engineerId);
    return Object.assign(engineer, updatedEngineer);
  }

  delete(engineerId: string) {
    this.engineers = [...this.engineers.filter(({ id }) => id !== engineerId)];
    return true;
  }
}
