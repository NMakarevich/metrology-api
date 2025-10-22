import { Injectable, NotFoundException } from '@nestjs/common';
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
    const address = this.addressDb.findOne(id);
    if (!address) {
      throw new NotFoundException('Address not found');
    }
    return address;
  }

  update(id: string, updateAddressDto: UpdateAddressDto) {
    this.checkForExist(id);
    const { address } = updateAddressDto;
    return this.addressDb.update(id, { address });
  }

  remove(id: string) {
    this.checkForExist(id);
    return this.addressDb.delete(id);
  }

  private checkForExist(id: string) {
    const address = this.addressDb.findOne(id);
    if (!address) {
      throw new NotFoundException('Address not found');
    }
  }
}
