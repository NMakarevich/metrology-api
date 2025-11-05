export class Instrument {
  id: string;
  serialNumber: string;
  verificatedAt: number;
  validUntil: number;
  createdAt: number;
  updatedAt: number;
  createdBy: string;
  updatedBy: string;
  status: Status;
  comment: string;
  clinicId: string;
  categoryId: string;
  modelId: string;
}

export enum Status {
  VALID = 'valid',
  PREPARE_TO_VALIDATION = 'prepare to validation',
  IN_VALIDATION = 'in validation',
  LOST = 'lost',
  INVALID = 'invalid',
  CANCELED = 'canceled',
}
