import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(
    @Body()
    createUserDto: CreateUserDto,
  ) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  login(
    @Body()
    loginDto: LoginUserDto,
  ) {
    return this.authService.login(loginDto);
  }
}