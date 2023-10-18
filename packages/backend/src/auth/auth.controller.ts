import { Body, Controller, Get, Post, Query, Res, Param, Headers, UseGuards, Patch, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TokenGuard } from 'src/guard/token.guard';

@Controller("/api/")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('refresh/:id') 
  refreshCallback(@Param('id') id: string, @Headers() headers: any) {
    if (headers.cookie.substring(3) !== undefined)
      return this.authService.refreshCallback(id, headers.cookie.substring(3));
    else 
      throw new UnauthorizedException("no token")
  }

  @UseGuards(TokenGuard)
  @Post('enable2Fa') //enables 2fa
  enable2Fa(@Headers('userId') userid: string) {
    try {
      return this.authService.enable2Fa(userid);
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(TokenGuard)
  @UseGuards(TokenGuard)
  @Patch('firstValidation')
  validate(@Headers('userId') userid: string, @Body('otp') otp: string){
    try {
      return this.authService.firstValidation(userid, otp)
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(TokenGuard)
  @Patch('verifyOtp')
  verifyOtp(@Headers('userId') userid: string, @Body('otp') otp: string) { //verifies otp
    try {
      return this.authService.verifyOtp(userid, otp);
    } catch (error) {
      throw error;
    }
  }
}