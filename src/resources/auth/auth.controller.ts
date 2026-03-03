import { Controller, Post, UseGuards, Request, HttpCode, HttpStatus, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { Public } from '../../decorators/public.decorator';
import { CreateEngineerDto } from '../engineer/dto/create-engineer.dto';
import { EngineerService } from '../engineer/engineer.service';

@Public()
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly engineerService: EngineerService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('/registry')
  async registry(@Body() createEngineerDto: CreateEngineerDto) {
    return this.engineerService.create(createEngineerDto);
  }
}
