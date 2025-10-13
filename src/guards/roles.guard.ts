import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ENGINEER_ROLE } from '../resources/engineer/entities/engineer.entity';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { EngineersDB } from '../mock/engineers';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly engineersDb: EngineersDB,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<ENGINEER_ROLE[]>(ROLES_KEY, [
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
      if (engineer.role === ENGINEER_ROLE.ENGINEER)
        return targetEngineer.role === ENGINEER_ROLE.ENGINEER;
      else return true;
    }
    return requiredRoles.includes(engineer.role);
  }
}
