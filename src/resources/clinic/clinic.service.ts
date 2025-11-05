import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateClinicDto } from './dto/create-clinic.dto';
import { UpdateClinicDto } from './dto/update-clinic.dto';
import { Clinics } from '../../mock/clinics';
import { AddressService } from '../address/address.service';

@Injectable()
export class ClinicService {
  constructor(
    private readonly clinicsDb: Clinics,
    private readonly addressService: AddressService,
  ) {}

  create(createClinicDto: CreateClinicDto) {
    const { addressId, address, ...data } = createClinicDto;
    if (!addressId && !address) {
      throw new BadRequestException('Select address or enter new address');
    }
    if (!addressId && address) {
      const newAddress = this.addressService.create({ address });
      return this.clinicsDb.create(Object.assign(data, { addressId: newAddress.id }));
    } else {
      return this.clinicsDb.create(Object.assign(data, { addressId }));
    }
  }

  findAll() {
    return this.clinicsDb.findAll();
  }

  findOne(id: string) {
    const clinic = this.clinicsDb.findOne(id);
    if (!clinic) {
      throw new NotFoundException('Clinic not found');
    }
    return clinic;
  }

  update(clinicId: string, updateClinicDto: UpdateClinicDto) {
    this.checkForExist(clinicId);
    const { addressId, address, ...data } = updateClinicDto;
    if (addressId) {
      return this.clinicsDb.update(clinicId, Object.assign(data, { addressId }));
    } else if (address) {
      const newAddress = this.addressService.create({ address });
      return this.clinicsDb.update(clinicId, Object.assign(data, { addressId: newAddress.id }));
    } else {
      return this.clinicsDb.update(clinicId, data);
    }
  }

  remove(id: string) {
    this.checkForExist(id);
    return this.clinicsDb.delete(id);
  }

  private checkForExist(id: string) {
    const clinic = this.clinicsDb.findOne(id);
    if (!clinic) {
      throw new NotFoundException('Clinic not found');
    }
  }
}
