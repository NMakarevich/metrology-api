import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEngineerDto } from './dto/create-engineer.dto';
import { UpdateEngineerDto } from './dto/update-engineer.dto';
import { EngineersDB } from '../../mock/engineers';
import { Engineer, ENGINEER_ROLE } from './entities/engineer.entity';

@Injectable()
export class EngineerService {
  constructor(private readonly db: EngineersDB) {}

  create(createEngineerDto: CreateEngineerDto) {
    const date = new Date().getTime();
    const newEngineer = new Engineer(
      Object.assign({}, createEngineerDto, {
        id: date.toString(),
        createdAt: date,
        updatedAt: date,
        updatedBy: null,
        version: 1,
        role: this.findAll().length === 0 ? ENGINEER_ROLE.ADMIN : ENGINEER_ROLE.ENGINEER,
      }),
    );
    return this.db.create(newEngineer);
  }

  findAll() {
    return this.db.getAll();
  }

  findOne(id: string) {
    return this.db.get(id);
  }

  findByLogin(engineerLogin: string) {
    return this.db.getByLogin(engineerLogin);
  }

  update(id: string, updateEngineerDto: UpdateEngineerDto, authorization: string) {
    if (updateEngineerDto.login) {
      const engineer = this.findByLogin(updateEngineerDto.login);
      if (engineer)
        throw new HttpException('Engineer with entered login is exist', HttpStatus.CONFLICT);
    }
    const engineer = this.findOne(id);
    const updatedEngineer = Object.assign(engineer, updateEngineerDto, {
      version: engineer.version + 1,
      updatedAt: new Date().getTime(),
      updatedBy: authorization,
    });
    return this.db.update(id, updatedEngineer);
  }

  remove(id: string) {
    return this.db.delete(id);
  }
}
