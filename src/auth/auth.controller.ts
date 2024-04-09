import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from '../user/dto/login-user.dto';

interface Token {
  access_token: string;
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async login(@Body() { email, password }: LoginUserDto): Promise<Token> {
    return this.authService.validarUsuario(email, password);
  }
}
