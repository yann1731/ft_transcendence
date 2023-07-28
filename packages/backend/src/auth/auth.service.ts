import { BadRequestException, Injectable } from "@nestjs/common";
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
            console.log('Successfully got token');
            return response.data;
        } catch (error) {
            console.error('Failed getting token');
            console.error(error);
            throw new BadRequestException('Failed getting token', error);
        }
    }

    async refreshCallback(id: string): Promise<AxiosResponse['data']> { //calls 42 api to exchange refresh_token for new token
        const uid: string =  process.env.UID;
        const secret: string = process.env.SECRET;
        try {
            const user = await this.prisma.user.findUnique({where: { id }});
            if (!user)
                throw new BadRequestException;
            const response = await axios.post('https://api.intra.42.fr/oauth/token', {
                grant_type: 'refresh_token',
                client_id: uid,
                client_secret: secret,
                redirect_uri: 'http://localhost:3000/wait',
                refresh_token: user.refresh_token
            });
            const update = await this.prisma.user.update({where: { id },
            data: {
                token: response.data.token,
                refresh_token: response.data.refresh_token,
                token_created_at: response.data.created_at,
                token_expires_in: response.data.expires_in,
                token_expires_at: response.data.created_at + response.data.expires_in
            }});
            console.log('successfully refreshed token');
            return response.data;
        } catch(error) {
            console.log('failed to refresh token');
            throw new BadRequestException('Failed refreshing token', error);
        }
    }
    
    async enable2Fa(userid: string): Promise<String> { //enbles 2fa
        try {
            const secret = speakeasy.generateSecret({length: 20});
            const storeSecret = await this.prisma.user.update({ where: { id: userid, },
                data: {
                    twoFaSecret: secret.base32,
                    twoFaEnabled: true
                }});
            console.log('success enable2fa');
            return secret.otpauth_url;
        }
        catch (error) {
            throw new BadRequestException('Failed generating secret', error);
        }
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
            console.error(error);
            throw new BadRequestException('Failed disabling 2fa', error);
        }
    }

    async verifyOtp(userid: string, otp: string): Promise<any> { //verifies otp
        try {
            const user = await this.prisma.user.findUnique({where: { id: userid }});
            if (user) {
                const verified = speakeasy.totp.verify({ //verifies otp
                    secret: user.twoFaSecret,
                    encoding: 'base32',
                    token: otp
                });
                if (verified) {
                    console.log(verified);
                    return verified;
                }
                else
                    throw new BadRequestException("Failed to verify");
            }
            else {
                throw new BadRequestException('User does not exist');
            }
        }
        catch (error) {
            console.error(error);
            throw new BadRequestException('Failed verifying otp', error);
        }
    }
        
}
