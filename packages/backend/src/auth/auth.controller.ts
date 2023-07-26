import { Body, Controller, Get, Post, Query, Res, Param, Headers, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { responseEncoding } from 'axios';
import { TokenGuard } from 'src/guard/token.guard';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('oauth') //calls 42 oauth api with provided code
  oauthCallback(@Body('code') code: string) {
    return this.authService.oauthCallback(code);
  }

  @Post('refreshToken/:id') //grabs a new token when old one is expired
  refreshCallback(@Param('id') id: string) {
    return this.authService.refreshCallback(id);
  }

  @UseGuards(TokenGuard)
  @Post('enable2Fa') //enables 2fa
  enable2Fa(@Headers('userid') userid: string) {
    return this.authService.enable2Fa(userid);
  }

  @UseGuards(TokenGuard)
  @Post('disable2Fa') //disables 2fa
  disable2Fa(@Headers('userid') userid: string) {
    return this.authService.disable2Fa(userid);
  }

  @UseGuards(TokenGuard)
  @Post('verifyOtp')
  verifyOtp(@Headers('userid') userid: string, @Body('otp') otp: string) { //verifies otp
    console.log('Entered verifyOtp');
    return this.authService.verifyOtp(userid, otp);
  }
}