import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
    controllers: [AuthController],
    providers: [AuthService, JwtService],
    imports: [PrismaModule, JwtModule.register({})]
})
export class AuthModule {}