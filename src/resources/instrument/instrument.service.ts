import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInstrumentDto } from './dto/create-instrument.dto';
import { UpdateInstrumentDto } from './dto/update-instrument.dto';
import { Instrument } from './entities/instrument.entity';
import { Instruments } from '../../mock/instruments';
import { VendorService } from '../vendor/vendor.service';
import { ModelService } from '../model/model.service';

@Injectable()
export class InstrumentService {
  constructor(
    private readonly instrumentsDb: Instruments,
    private readonly vendorService: VendorService,
    private readonly modelService: ModelService,
  ) {}

  create(clinicId: string, categoryId: string, createInstrumentDto: CreateInstrumentDto) {
    const newInstrument = new Instrument();
    const date = new Date().getTime();
    const { serialNumber, status, modelId, comment, validUntil, verifiedAt } = createInstrumentDto;
    if (!modelId) {
      const { modelName, vendorName, registryNumber, registryName, validationPrice } =
        createInstrumentDto;
      const newVendor = this.vendorService.create({
        name: vendorName,
        categoryId,
      });
      const newModel = this.modelService.create({
        name: modelName,
        registryName,
        registryNumber,
        validationPrice,
        vendorId: newVendor.id,
      });

      return this.instrumentsDb.create(
        Object.assign(newInstrument, {
          modelId: newModel.id,
          createdAt: date,
          updatedAt: date,
          serialNumber,
          status,
          comment,
          validUntil,
          verifiedAt,
          clinicId,
          categoryId,
        }),
      );
    }
    return this.instrumentsDb.create(
      Object.assign(newInstrument, createInstrumentDto, {
        createdAt: date,
        updatedAt: date,
        clinicId,
        categoryId,
      }),
    );
  }

  findAll(clinicId: string, categoryId: string) {
    return this.instrumentsDb
      .findAll()
      .filter(
        (instrument) => instrument.categoryId === categoryId && instrument.clinicId === clinicId,
      );
  }

  findOne(id: string) {
    return this.instrumentsDb.findOne(id);
  }

  update(instrumentId: string, updateInstrumentDto: UpdateInstrumentDto) {
    this.checkForExist(instrumentId);
    return this.instrumentsDb.update(instrumentId, updateInstrumentDto);
  }

  remove(id: string) {
    this.checkForExist(id);
    return this.instrumentsDb.delete(id);
  }

  private checkForExist(id: string) {
    const instrument = this.instrumentsDb.findOne(id);
    if (!instrument) {
      throw new NotFoundException('Instrument not found');
    }
  }
}
