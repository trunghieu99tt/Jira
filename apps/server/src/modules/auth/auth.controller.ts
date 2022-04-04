import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { LoginInputDto } from './dtos/login-input.dto';
import { AuthTokenOutputDto } from './dtos/auth-token-output.dto';
import { RegisterInputDto } from './dtos/register-input.dto';
import { RegisterOutputDto } from './dtos/register-output.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() input: LoginInputDto): Promise<AuthTokenOutputDto> {
    return this.authService.login(input);
  }

  @Post('register')
  async register(@Body() input: RegisterInputDto): Promise<RegisterOutputDto> {
    return this.authService.register(input);
  }
}
