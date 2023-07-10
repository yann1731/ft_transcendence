import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { responseEncoding } from 'axios';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('oauth')
  oauthCallback(@Body('code') code: string) {
    return this.authService.oauthCallback(code);
  }
}