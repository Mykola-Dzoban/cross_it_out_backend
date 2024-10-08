import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { Logger } from 'src/utils/ConsoleLogger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('check')
  checkFunc() {
    return this.authService.testFunc();
  }

  @Post('login')
  login(@Body() authLoginDto: AuthLoginDto) {
    Logger.debug(process.env.NODE_ENV);
    return this.authService.login(authLoginDto);
  }
}
