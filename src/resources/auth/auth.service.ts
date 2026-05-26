import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import 'dotenv/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(login: string, pass: string): Promise<any> {
    const user = await this.userService.findByLogin(login);
    if (user) {
      const isMatchPasswords = await bcrypt.compare(pass, user.password);
      if (!isMatchPasswords) {
        return null;
      }
      delete user.password;
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = { login: user.login, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      ...user,
    };
  }
}
