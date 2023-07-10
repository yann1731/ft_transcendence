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

function validateRequest(request, prisma): boolean {
    const userId: string = request.headers.userId;
    const token: string = request.headers.authorization;
    if (!userId || !token) {
        throw new BadRequestException;
    }
    const user = prisma.user.findUnique({where : { userId }});
    if (!user) {
        throw new ForbiddenException;
    }
    const savedToken: string = user.token;
    const expires_at: number = user.expires_in +  user.created_at;
    if (savedToken != token || (Date.now() / 1000) < expires_at)
        return false;
    return true;
}