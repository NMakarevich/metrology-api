import { OmitType } from '@nestjs/mapped-types';
import { CreateClinicDto } from './create-clinic.dto';

export class UpdateClinicDto extends OmitType(CreateClinicDto, ['contacts']) {}
