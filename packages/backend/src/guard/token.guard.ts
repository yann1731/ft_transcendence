import { Injectable, CanActivate, ExecutionContext, BadRequestException, ForbiddenException } from '@nestjs/common';
import axios from 'axios';
import { Observable } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TokenGuard implements CanActivate {
    constructor(private prisma: PrismaService) { };
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        return validateRequest(request, this.prisma);
    }
}

async function validateRequest(request, prisma): Promise<boolean> { //validates token and user id for request to endpoints
    const userId: string = request.headers.userid;
    const token: string = request.headers.authorization;
    if (!userId || !token) {
        console.log('bad userid or token');
        return false;
    }
    const user = await prisma.user.findUnique({where : { id: userId }});
    if (!user) {
        console.log('failed fetching user')
        return false;
    }
    const savedToken: string = user.token;
    if (savedToken != token) {
        console.log('tokens don\'t match');
        return false;
    }

    if ((Date.now() / 1000) > user.token_expires_at) {
        try {
            const refresh = axios.post('/refreshToken' + userId);
        } catch (error) {
            console.log(error, 'error refreshing token');
            return false;
        }
    }
    return true;
}