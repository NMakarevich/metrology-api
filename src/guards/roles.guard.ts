import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { EngineersDB } from '../mock/engineers';
import { Role } from '../../generated/prisma/enums';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly engineersDb: EngineersDB,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const { authorization } = context.switchToHttp().getRequest().headers;
    const { method, url } = context.switchToHttp().getRequest();
    const engineer = this.engineersDb.get(authorization);
    if (method === 'PATCH') {
      const engineerId = url.split('/').pop();
      const targetEngineer = this.engineersDb.get(engineerId);
      if (engineer.role === Role.ENGINEER) return targetEngineer.role === Role.ENGINEER;
      else return true;
    }
    return requiredRoles.includes(engineer.role);
  }
}
