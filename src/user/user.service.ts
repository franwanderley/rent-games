import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  validateUser(payload: any) {
    return this.userRepository.findOneBy({ email: payload?.email });
  }

  create(createUserDto: CreateUserDto) {
    const user: User = new User();
    user.name = createUserDto.name;
    user.email = createUserDto.email;
    user.password = createUserDto.password;
    return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  login({ email, password }: LoginUserDto) {
    return this.userRepository.findOneBy({ email, password });
  }

  async remove(id: number) {
    const user: User | null = await this.findOne(id);
    if (user) {
      this.userRepository.remove(user);
    }
  }
}
