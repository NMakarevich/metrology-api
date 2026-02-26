import { Injectable } from '@nestjs/common';
import { EngineerService } from '../engineer/engineer.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import 'dotenv/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly engineerService: EngineerService,
    private readonly jwtService: JwtService,
  ) {}

  async validateEngineer(login: string, pass: string): Promise<any> {
    const engineer = await this.engineerService.findByLogin(login);
    if (engineer) {
      const isMatchPasswords = await bcrypt.compare(pass, engineer.password);
      if (!isMatchPasswords) {
        return null;
      }
      const { password, ...result } = engineer;
      return result;
    }
    return null;
  }

  async login(engineer: any) {
    const payload = { login: engineer.login, sub: engineer.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
