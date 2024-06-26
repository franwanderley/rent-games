import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';

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
    const user = await this.usersService.validateUser(email);
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        return await this.gerarToken(user);
      }
    }
    throw new UnauthorizedException('Usuário ou Senha Inválidos');
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
