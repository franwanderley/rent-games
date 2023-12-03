import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

interface Token {
  access_token: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private jwtService: JwtService,
  ) {}
  async validarUsuario(email: string, password: string): Promise<Token> {
    const user = await this.usersService.login({ email, password });
    if (!user) {
      throw new UnauthorizedException('Usuário ou Senha Inválidos');
    }
    return await this.gerarToken(user);
  }

  async gerarToken(payload: User): Promise<Token> {
    return {
      access_token: this.jwtService.sign(
        { email: payload.email, role: payload.role },
        {
          secret: process.env.JWT_SECRET,
          expiresIn: '1000s',
        },
      ),
    };
  }
}
