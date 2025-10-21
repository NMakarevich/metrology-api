import { Injectable } from '@nestjs/common';
import { EngineerService } from '../engineer/engineer.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly engineerService: EngineerService,
    private readonly jwtService: JwtService,
  ) {}

  async validateEngineer(login: string, pass: string): Promise<any> {
    const engineer = this.engineerService.findByLogin(login);
    if (engineer && engineer.password === pass) {
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
