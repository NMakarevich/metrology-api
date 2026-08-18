import { Injectable } from '@nestjs/common';
import { BaseDb } from './base-db';
import { Clinic } from '../resources/clinic/entities/clinic.entity';

@Injectable()
export class Clinics extends BaseDb<Clinic> {}
