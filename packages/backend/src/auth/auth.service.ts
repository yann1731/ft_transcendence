import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import axios, { Axios, AxiosResponse } from "axios";

//POST request to the https://api.intra.42.fr/oauth/token
@Injectable({})
export class AuthService {
    constructor(private prisma: PrismaService) {}

    async oauthCallback(code: string): Promise<AxiosResponse["data"]> { //calls 42 api to exchange code for token
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
            console.log(error);
            throw new BadRequestException('Failed getting token', error);
        }
    }

    async refreshCallback(id: string): Promise<AxiosResponse["data"]> { //calls 42 api to exchange refresh_token for new token
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
            console.log('successfully refreshed token');
            return response.data;
        } catch(error) {
            console.log('failed to refresh token');
            throw new BadRequestException('Failed refreshing token', error);
        }
      }
}
