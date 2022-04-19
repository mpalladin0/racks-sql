import { Controller, Get, Request, Post, UseGuards, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { AuthService, UserAuthenticatedJWTPayload } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { LoginUserDto } from './user/dto/login-user-dto';
import { User } from './user/models/user.model';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
    ) {}

  @ApiTags('auth')
  @ApiResponse({ status: 201, description: 'The user has succesfully been authenticated.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Body() loginUserDto: LoginUserDto): Promise<UserAuthenticatedJWTPayload> {
    return this.authService.login(loginUserDto);
  }
}

