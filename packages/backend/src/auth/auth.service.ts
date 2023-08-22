import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import axios, { Axios, AxiosResponse } from "axios";
import * as speakeasy from 'speakeasy';

//POST request to the https://api.intra.42.fr/oauth/token
@Injectable({})
export class AuthService {
    constructor(private prisma: PrismaService) {}

    async oauthCallback(code: string): Promise<AxiosResponse['data']> { //calls 42 api to exchange code for token
        const uid: string =  process.env.UID;
        const secret: string = process.env.SECRET;

        try {
            const response = await axios.post('https://api.intra.42.fr/oauth/token', {
                grant_type: 'authorization_code',
                client_id: uid,
                client_secret: secret,
                redirect_uri: 'http://localhost:3000/wait',
                code: code
            });
            return response.data;
        } catch (error) {
            throw new BadRequestException('Failed getting token', error);
        }
    }

    async refreshCallback(id: string): Promise<AxiosResponse['data']> { //calls 42 api to exchange refresh_token for new token
        const uid: string =  process.env.UID;
        const secret: string = process.env.SECRET;
        let response: AxiosResponse;
        let user
        try {
            user = await this.prisma.user.findUnique({where: { id }});
        } catch (error) {
            throw new BadRequestException('Could not find specified user');
        }
        try {
            response = await axios.post('https://api.intra.42.fr/oauth/token', {
                grant_type: 'refresh_token',
                client_id: uid,
                client_secret: secret,
                redirect_uri: 'http://localhost:3000/wait',
                refresh_token: user.refresh_token
            });
        } catch (error) {
            throw new BadRequestException('Failed to refresh token');
        }
        try {
            const update = await this.prisma.user.update({where: { id },
                data: {
                    token: response.data.token,
                    refresh_token: response.data.refresh_token,
                    token_created_at: response.data.created_at,
                    token_expires_in: response.data.expires_in,
                    token_expires_at: response.data.created_at + response.data.expires_in
                }});
        } catch (error) {
            throw new InternalServerErrorException('Could not update specified user with new token');
        }
        return response.data;
    }
    
    async enable2Fa(userid: string): Promise<String> { //enbles 2fa
        let secret: any;
        try {
            secret = speakeasy.generateSecret({length: 20});
            const storeSecret = await this.prisma.user.update({ where: { id: userid, },
                data: {
                    twoFaSecret: secret.base32,
                    twoFaEnabled: true
            }});
        } catch (error) {
            throw new InternalServerErrorException('Could not generate QR code');
        }
        return secret.otpauth_url;
    }

    async disable2Fa(userid: string): Promise<void> { //disables 2fa
        try {
            const user = await this.prisma.user.update({where: { id: userid },
                data: {
                    twoFaSecret: null,
                    twoFaEnabled: false
                }});
        }
        catch (error) {
            throw new InternalServerErrorException('Could not disable two factor authentication');
        }
    }

    async verifyOtp(userid: string, otp: string): Promise<any> { //verifies otp
        let user: any;
        try {
            user = await this.prisma.user.findUnique({where: { id: userid }});
        } catch (error) {
            throw new InternalServerErrorException('Could not find specified user');
        }
        try {
            const verified = speakeasy.totp.verify({ //verifies otp
                secret: user.twoFaSecret,
                encoding: 'base32',
                token: otp
            });
            if (!verified)
                throw new InternalServerErrorException('Invalid otp')
        }
        catch (error) {
            throw new InternalServerErrorException('Invalid otp');
        }
    }
        
}
