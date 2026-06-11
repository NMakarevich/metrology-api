import { Exclude } from 'class-transformer';
import { Role } from '../../../../generated/prisma/enums';

export class User {
  id: string;
  firstName: string;
  lastName: string;
  login: string;

  @Exclude()
  password: string;

  role: Role;

  createdAt: string | Date;
  updatedAt: string | Date;
  version: number;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
