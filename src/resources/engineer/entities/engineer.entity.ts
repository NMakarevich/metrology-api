import { Exclude } from 'class-transformer';
import { Role } from '../../../../generated/prisma/enums';

export class Engineer {
  id: string;
  firstName: string;
  lastName: string;
  login: string;

  @Exclude()
  password: string;

  role: Role;

  createdAt: string | Date;
  updatedAt: string | Date;
  updatedBy: string | null;
  version: number;

  constructor(partial: Partial<Engineer>) {
    Object.assign(this, partial);
  }
}
