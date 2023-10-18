import { BadRequestException, Injectable, InternalServerErrorException, NotAcceptableException, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import * as speakeasy from 'speakeasy';
import { JwtService } from "@nestjs/jwt"
import { User } from "@prisma/client";


@Injectable({})
export class AuthService {
    constructor(private prisma: PrismaService, private jwtService: JwtService) {}

    async generateToken(id: string) {
        const access = await this.jwtService.signAsync({
            sub: id,
        }, 
        {
            secret: process.env.SECRET,
            expiresIn: 100
        })
    
        const refresh = await this.jwtService.signAsync({
            sub: id,
        }, 
        {
            secret: process.env.SECRET,
            expiresIn: 43200
        })
    
        return {access, refresh}
    }


    async refreshCallback(id: string, token: string) {
        let user: User;

        try {
            user = await this.prisma.user.findUnique({where: {id: id}})
        } catch (error) {
            throw new BadRequestException('Could not find specified user');
        }
        if (user.refresh_token !== token)
            throw new BadRequestException("Tokens do not match")
        
        const payload = await this.jwtService.verifyAsync(token, { secret: process.env.SECRET })
        if (Date.now() / 1000 >= payload.exp)
            throw new UnauthorizedException("Refresh token is not valid anymore");
        
        const tokens = await this.generateToken(id);

        return tokens
    }
    
    secrets: Map<string, string> = new Map<string, string>();

    async enable2Fa(userid: string): Promise<String> { //enbles 2fa
        let secret: any;
        try {
            secret = speakeasy.generateSecret({length: 20});
            this.secrets.set(userid, secret.base32);
        } catch (error) {
            throw new InternalServerErrorException('Could not generate QR code');
        }
        return secret.otpauth_url;
    }

    async firstValidation(userid: string, otp:string) {
        try {
            const verified = speakeasy.totp.verify({
                secret: this.secrets.get(userid),
                encoding: 'base32',
                token: otp
            })
            if (!verified) {
                throw new BadRequestException('Invalid otp')
            }
            await this.prisma.user.update({
                where: {
                    id: userid
                },
                data: {
                    twoFaEnabled: true,
                    twoFaSecret: this.secrets.get(userid)
                }
            })
            this.secrets.delete(userid);
            return verified
        } catch (error){
            throw error;
        }
    }

    async verifyOtp(userid: string, otp: string): Promise<any> { //verifies otp
        let user: any;
        try {
            
            user = await this.prisma.user.findUnique({where: { id: userid }});
            
        } catch (error) {
            
            throw new BadRequestException('Could not find specified user');
        }
        try {
            const verified = speakeasy.totp.verify({ //verifies otp
                secret: user.twoFaSecret,
                encoding: 'base32',
                token: otp
            });
            
            if (!verified) {
                
                throw new InternalServerErrorException('Invalid otp');
            }
            return verified;
        }
        catch (error) {
            
            throw error;
        }
    }
        
}
