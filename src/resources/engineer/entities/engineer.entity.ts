import { Exclude } from 'class-transformer';

export class Engineer {
  id: string;
  firstName: string;
  lastName: string;
  login: string;

  @Exclude()
  password: string;

  role: ENGINEER_ROLE;

  createdAt: number;
  updatedAt: number;
  updatedBy: string | null;
  version: number;

  constructor(partial: Partial<Engineer>) {
    Object.assign(this, partial);
  }
}

export enum ENGINEER_ROLE {
  ADMIN = 'admin',
  ENGINEER = 'engineer',
}
