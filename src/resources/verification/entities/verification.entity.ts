export class Verification {
  id: string;
  account: string;
  date: number;
  categoryId: string;
  instrumentIds: string[];
  status: VALIDATION_STATUS;
}

export enum VALIDATION_STATUS {
  IN_VALIDATION,
  PAID,
  DONE,
}
