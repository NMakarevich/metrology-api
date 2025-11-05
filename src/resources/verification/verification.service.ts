import { Injectable } from '@nestjs/common';
import { CreateVerificationDto } from './dto/create-verification.dto';
import { UpdateVerificationDto } from './dto/update-verification.dto';
import { Verifications } from '../../mock/verifications';

@Injectable()
export class VerificationService {
  constructor(private readonly verificationsDb: Verifications) {}

  create(createVerificationDto: CreateVerificationDto) {
    return this.verificationsDb.create(
      Object.assign(createVerificationDto, { date: new Date().getTime() }),
    );
  }

  findAll() {
    return this.verificationsDb.findAll();
  }

  findOne(id: string) {
    return this.verificationsDb.findOne(id);
  }

  update(id: string, updateVerificationDto: UpdateVerificationDto) {
    return this.verificationsDb.update(id, updateVerificationDto);
  }

  remove(id: string) {
    return this.verificationsDb.delete(id);
  }
}
