import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from '../../generated/prisma/enums';
import { UserService } from '../resources/user/user.service';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import 'dotenv/config';
import * as process from 'node:process';
import { DEFAULT_JWT_SECRET } from '../resources/auth/constants';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly userService: UserService,
    private readonly jwt: JwtService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const { authorization } = context.switchToHttp().getRequest().headers;
    const id = await this.extractId(authorization);
    const { method, url } = context.switchToHttp().getRequest();

    try {
      const user = await this.userService.findOne(id);
      if (url.includes('user') && (method === 'PATCH' || method === 'DELETE')) {
        const userId = url.split('/').pop();
        const targetUser = await this.userService.findOne(userId);
        if (user.role === Role.ENGINEER) return targetUser.role === Role.ENGINEER;
        else return true;
      }
      return requiredRoles.includes(user.role);
    } catch (error: unknown) {
      if (error instanceof HttpException) {
        if (error.getStatus() === HttpStatus.NOT_FOUND) {
          throw new UnauthorizedException();
        }
      }
    }
  }

  private async extractId(authorization: string) {
    const token = authorization.replace('Bearer ', '');
    try {
      const { sub } = await this.jwt.verify(token, {
        secret: process.env.JWT_SECRET ?? DEFAULT_JWT_SECRET,
      });
      return sub;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new UnauthorizedException();
      }
    }
  }
}
