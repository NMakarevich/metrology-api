import { Injectable } from '@nestjs/common';
import { BaseDb } from './base-db';
import { Address } from '../resources/address/entities/address.entity';

@Injectable()
export class Addresses extends BaseDb<Address> {}
