import { SetMetadata } from '@nestjs/common';
import { ENGINEER_ROLE } from '../resources/engineer/entities/engineer.entity';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: ENGINEER_ROLE[]) => SetMetadata(ROLES_KEY, roles);
