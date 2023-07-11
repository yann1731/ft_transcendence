import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { responseEncoding } from 'axios';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('oauth') //calls 42 oauth api with provided code
  oauthCallback(@Body('code') code: string) {
    return this.authService.oauthCallback(code);
  }
}