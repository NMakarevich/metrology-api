import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';
import { Vendors } from '../../mock/vendors';

@Injectable()
export class VendorService {
  constructor(private readonly vendorsDb: Vendors) {}

  create(createVendorDto: CreateVendorDto) {
    return this.vendorsDb.create(createVendorDto);
  }

  findAll(categoryId: string) {
    return this.vendorsDb.findAll().filter((vendor) => vendor.categoryId === categoryId);
  }

  findOne(id: string) {
    this.checkForExist(id);
    return this.vendorsDb.findOne(id);
  }

  update(vendorId: string, updateVendorDto: UpdateVendorDto) {
    this.checkForExist(vendorId);
    return this.vendorsDb.update(vendorId, updateVendorDto);
  }

  remove(id: string) {
    this.checkForExist(id);
    return this.vendorsDb.delete(id);
  }

  private checkForExist(vendorId: string) {
    const vendor = this.vendorsDb.findOne(vendorId);
    if (!vendor) throw new NotFoundException('Vendor not found');
  }
}
