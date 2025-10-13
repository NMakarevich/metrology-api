import { Injectable } from '@nestjs/common';
import { Engineer, ENGINEER_ROLE } from '../resources/engineer/entities/engineer.entity';
import { UpdateEngineerDto } from '../resources/engineer/dto/update-engineer.dto';

@Injectable()
export class EngineersDB {
  engineers: Engineer[] = [
    new Engineer({
      firstName: 'Nikolai',
      lastName: 'Makarevich',
      login: 'makarevichna',
      password: 'password',
      id: '1760372675265',
      createdAt: 1760372675265,
      updatedAt: 1760372675265,
      updatedBy: null,
      version: 1,
      role: ENGINEER_ROLE.ADMIN,
    }),
    new Engineer({
      firstName: 'Nikolai',
      lastName: 'Makarevich',
      login: 'makarevichna1',
      password: 'password',
      id: '1760372687871',
      createdAt: 1760372687871,
      updatedAt: 1760372687871,
      updatedBy: null,
      version: 1,
      role: ENGINEER_ROLE.ENGINEER,
    }),
  ];

  create(engineer: Engineer) {
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

  update(engineerId: string, updatedEngineer: Engineer) {
    const engineer = this.engineers.find(({ id }) => id === engineerId);
    return Object.assign(engineer, updatedEngineer);
  }

  delete(engineerId: string) {
    this.engineers = [...this.engineers.filter(({ id }) => id !== engineerId)];
    return true;
  }
}
