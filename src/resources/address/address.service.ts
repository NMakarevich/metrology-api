import { Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Addresses } from '../../mock/addresses';

@Injectable()
export class AddressService {
  constructor(private readonly addressDb: Addresses) {}

  create(createAddressDto: CreateAddressDto) {
    return this.addressDb.create(createAddressDto);
  }

  findAll() {
    return this.addressDb.findAll();
  }

  findOne(id: string) {
    return this.addressDb.findOne(id);
  }

  update(id: string, updateAddressDto: UpdateAddressDto) {
    return this.addressDb.update(id, updateAddressDto);
  }

  remove(id: string) {
    return this.addressDb.delete(id);
  }
}
