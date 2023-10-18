import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtPayload } from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt';
 
@Injectable()
export class meGuard implements CanActivate {
    constructor(private prisma: PrismaService, private jwt: JwtService) { };
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        return validateRequest(request, this.jwt);
    }
}

async function validateRequest(request, jwt): Promise<boolean> {
    try{
        const userId: string = request.headers.userid;
        const token: string = request.headers.authorization;
        const id: string = request.params.id
        if (!userId || !token) {
            console.error('bad userid or token');
            return false;
        }
        const base64Payload = token.split('.')[1];
        const payloadBuffer = Buffer.from(base64Payload, 'base64');
        const payload: JwtPayload = JSON.parse(payloadBuffer.toString()) as JwtPayload;   
        if (payload.sub !== userId) {
            console.error("id and token id do not match")
            return false
        }
        if (userId !== id) {
            console.error("user id and id requested do not match")
            return false
        }
        jwt.verify(token, {secret: process.env.SECRET})
        return true;
    } catch (error) {
        return false
    }
}