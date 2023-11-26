import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Body,
  UseGuards,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/JwtAuthGuardian';
import { User } from './entities/user.entity';

interface UserRequest extends Request {
  user: User;
}

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Req() request: UserRequest) {
    if (request.user.role !== 'ADMIN') {
      throw new UnauthorizedException();
    }
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number, @Req() request: UserRequest) {
    if (request.user.role !== 'ADMIN' && id !== request.user.id) {
      throw new UnauthorizedException();
    }
    return this.userService.remove(id);
  }
}
