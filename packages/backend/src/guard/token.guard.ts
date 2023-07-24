import { Injectable, CanActivate, ExecutionContext, BadRequestException, ForbiddenException } from '@nestjs/common';
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

    console.log(userId);
    console.log(token);
    if (!userId || !token) {
        console.log('bad userid or token');
        return false;
    }
    const user = await prisma.user.findUnique({where : { id: userId }});
    if (!user) {
        console.log('failed fetching user')
        return false;
    }
    console.log(user);
    const savedToken: string = user.token;
    const expires_at: number = user.token_expires_in + user.token_created_at;
    console.log(expires_at);
    console.log((Date.now() / 1000));
    if (savedToken != token || (Date.now() / 1000) > expires_at) {
        console.log('token expired');
        return false;
    }
    return true;
}