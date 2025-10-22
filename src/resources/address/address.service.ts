import { Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Addresses } from '../../mock/addresses';
import { Address } from './entities/address.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AddressService {
  constructor(private readonly addressDb: Addresses) {}

  create(createAddressDto: CreateAddressDto) {
    const address = new Address();
    const newAddress = Object.assign(address, { id: uuidv4() }, createAddressDto);
    return this.addressDb.create(newAddress);
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
