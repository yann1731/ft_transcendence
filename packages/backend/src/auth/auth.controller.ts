import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { responseEncoding } from 'axios';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('oauth/callback')
  async oauthCallback(@Body('code') code: string) {
    return await this.oauthCallback(code);
  }

  @Post('signin')
  signin() {
    return this.authService.signin();
  }
}