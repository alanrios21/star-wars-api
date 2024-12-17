import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register({ username, email, password }: CreateUserDto) {
    const user = await this.usersService.findOneByEmail(email);

    if (user) {
      throw new BadRequestException('User already exists');
    }

    await this.usersService.create({
      username,
      email,
      password: await bcryptjs.hash(password, 10),
    });

    return {
      username,
      email
    };
  }

  async login({ email }: LoginUserDto) {
    const user = await this.usersService.findByEmailWithPassword(email);
    if (!user) {
      throw new BadRequestException('email is wrong');
    }

    const payload = { email: user.email, role: user.role };
    const token = await this.jwtService.signAsync(payload);

    return {
      token,
      email
    };
  }
}